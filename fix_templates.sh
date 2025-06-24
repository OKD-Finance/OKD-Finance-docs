#!/bin/bash

# Fix template structure issues in API documentation files

echo "Fixing template structure issues..."

# Find all API files with template #examples
for file in docs/en/api/*.md; do
    if [ -f "$file" ]; then
        echo "Processing $file..."
        
        # Check if file has template #examples but missing content template closing
        if grep -q "template #examples" "$file"; then
            # Find the line number of template #examples
            examples_line=$(grep -n "template #examples" "$file" | cut -d: -f1)
            
            # Check if there's a </template> before template #examples
            content_close_line=$(head -n $((examples_line - 1)) "$file" | grep -n "</template>" | tail -1 | cut -d: -f1)
            
            if [ -z "$content_close_line" ]; then
                echo "  Adding missing </template> for content section in $file"
                # Insert </template> before template #examples
                sed -i "$((examples_line - 1))i\\  </template>" "$file"
            fi
        fi
        
        # Remove any standalone PHP closing tags
        sed -i '/^?>$/d' "$file"
        
        # Fix any trailing spaces in closing tags
        sed -i 's|</ApiDoc> *$|</ApiDoc>|g' "$file"
        
        # Fix duplicate ApiDoc closing tags
        sed -i 's|</script> </ApiDoc>|</script>\n</ApiDoc>|g' "$file"
        
        # Remove duplicate ApiDoc tags that appear on the same line
        sed -i 's|</ApiDoc></ApiDoc>|</ApiDoc>|g' "$file"
        
        # Fix script placement - ensure script comes before final </template>
        # This handles cases where script is after </template>
        if grep -q "</template>" "$file" && grep -q "<script>" "$file"; then
            # Create a temporary file to reorganize
            temp_file=$(mktemp)
            
            # Extract everything before the last </template>
            grep -n "</template>" "$file" | tail -1 | cut -d: -f1 | while read last_template_line; do
                # Get content before last template
                head -n $((last_template_line - 1)) "$file" > "$temp_file"
                
                # Check if there's a script after the template
                tail -n +$((last_template_line + 1)) "$file" | grep -q "<script>" && {
                    # Add script content before closing template
                    echo "" >> "$temp_file"
                    tail -n +$((last_template_line + 1)) "$file" | sed -n '/<script>/,/<\/script>/p' >> "$temp_file"
                    echo "" >> "$temp_file"
                    echo "  </template>" >> "$temp_file"
                    
                    # Add final ApiDoc tag
                    tail -n +$((last_template_line + 1)) "$file" | grep -v -e "<script>" -e "</script>" -e "^$" | grep "</ApiDoc>" >> "$temp_file"
                    
                    # Replace original file
                    mv "$temp_file" "$file"
                } || {
                    # No script after template, just copy as is
                    rm "$temp_file"
                }
            done
        fi
        
        echo "  Fixed $file"
    fi
done

echo "Template structure fixes completed!" 