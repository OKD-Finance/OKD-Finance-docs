const fs = require('fs');
const path = require('path');

class CodeGenerators {
    static generateCurl(endpoint, method, params) {
        const baseUrl = 'https://develop.okd.finance/api';
        let curlCmd = `curl -X ${method.toUpperCase()} "${baseUrl}${endpoint}" \\\\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\\\
  -H "Content-Type: application/json"`;

        if (method.toLowerCase() !== 'get' && params.length > 0) {
            const bodyExample = {};
            params.forEach(param => {
                if (param.type === 'boolean') {
                    bodyExample[param.name] = true;
                } else if (param.type === 'integer') {
                    bodyExample[param.name] = 123;
                } else {
                    bodyExample[param.name] = `example_${param.name}`;
                }
            });
            curlCmd += ` \\\\
  -d '${JSON.stringify(bodyExample)}'`;
        }

        return curlCmd;
    }

    static generateGo(endpoint, method, params, functionName) {
        const structName = functionName.charAt(0).toUpperCase() + functionName.slice(1) + 'Request';

        let structFields = '';
        let dataFields = '';

        params.forEach(param => {
            const goType = param.type === 'boolean' ? 'bool' : param.type === 'integer' ? 'int' : 'string';
            structFields += `    ${param.name.charAt(0).toUpperCase() + param.name.slice(1)} ${goType} \\`json: "${param.name}"\\`\\n`;

            if (param.type === 'boolean') {
                dataFields += `        ${param.name.charAt(0).toUpperCase() + param.name.slice(1)}: true,\\n`;
            } else if (param.type === 'integer') {
                dataFields += `        ${param.name.charAt(0).toUpperCase() + param.name.slice(1)}: 123,\\n`;
            } else {
                dataFields += `        ${param.name.charAt(0).toUpperCase() + param.name.slice(1)}: "example_${param.name}",\\n`;
            }
        });

        return `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

type ${structName} struct {
${structFields}}

func ${functionName}(token string, data ${structName}) error {
    url := "https://develop.okd.finance/api${endpoint}"
    
    jsonData, _ := json.Marshal(data)
    
    req, _ := http.NewRequest("${method.toUpperCase()}", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer "+token)
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode != http.StatusOK {
        return fmt.Errorf("API error: %d", resp.StatusCode)
    }
    
    return nil
}

func main() {
    data := ${structName}{
${dataFields}    }
    
    err := ${functionName}("YOUR_ACCESS_TOKEN", data)
    if err != nil {
        fmt.Printf("Error: %v\\\\n", err)
        return
    }
    
    fmt.Printf("${functionName} completed successfully!\\\\n")
}`;
    }

    static generateTypeScript(endpoint, method, params, functionName) {
        let interfaceFields = '';
        let exampleData = '';

        params.forEach(param => {
            const tsType = param.type === 'boolean' ? 'boolean' : param.type === 'integer' ? 'number' : 'string';
            interfaceFields += `  ${param.name}: ${tsType};\\n`;

            if (param.type === 'boolean') {
                exampleData += `    ${param.name}: true,\\n`;
            } else if (param.type === 'integer') {
                exampleData += `    ${param.name}: 123,\\n`;
            } else {
                exampleData += `    ${param.name}: "example_${param.name}",\\n`;
            }
        });

        const requestInterface = functionName.charAt(0).toUpperCase() + functionName.slice(1) + 'Request';

        return `interface ${requestInterface} {
${interfaceFields}}

interface ApiResponse {
  success: boolean;
  message?: string;
}

async function ${functionName}(
  baseUrl: string,
  accessToken: string,
  data: ${requestInterface}
): Promise&lt;ApiResponse&gt; {
  const response = await fetch(\\`\\${ baseUrl }${ endpoint } \\`, {
    method: '${method.toUpperCase()}',
    headers: {
      'Authorization': \\`Bearer \\${ accessToken } \\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(\\`API Error: \\${ responseData.message } \\`);
  }

  return responseData as ApiResponse;
}

async function main(): Promise&lt;void&gt; {
  const data: ${requestInterface} = {
${exampleData}  };

  try {
    const result = await ${functionName}(
      'https://develop.okd.finance/api',
      'YOUR_ACCESS_TOKEN',
      data
    );
    
    console.log('${functionName} completed successfully!');
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`;
    }

    static generatePHP(endpoint, method, params, functionName) {
        let exampleData = '';

        params.forEach(param => {
            if (param.type === 'boolean') {
                exampleData += `        '${param.name}' => true,\\n`;
            } else if (param.type === 'integer') {
                exampleData += `        '${param.name}' => 123,\\n`;
            } else {
                exampleData += `        '${param.name}' => 'example_${param.name}',\\n`;
            }
        });

        return `&lt;?php

function ${functionName}($baseUrl, $accessToken, $data) {
    $url = $baseUrl . '${endpoint}';
    
    $headers = [
        'Authorization: Bearer ' . $accessToken,
        'Content-Type: application/json'
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => '${method.toUpperCase()}',
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || !empty($error)) {
        throw new Exception("cURL Error: " . $error);
    }

    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("Invalid JSON response");
    }

    if ($httpCode !== 200) {
        $message = $data['message'] ?? 'Unknown API error';
        $code = $data['code'] ?? $httpCode;
        throw new Exception("API Error {$code}: {$message}");
    }

    return $data;
}

try {
    $data = [
${exampleData}    ];

    $result = ${functionName}(
        'https://develop.okd.finance/api',
        'YOUR_ACCESS_TOKEN',
        $data
    );

    echo "${functionName} completed successfully!\\\\n";
    echo "Result: " . json_encode($result, JSON_PRETTY_PRINT) . "\\\\n";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\\\n";
}

?&gt;`;
    }

    static generatePython(endpoint, method, params, functionName) {
        let exampleData = '';

        params.forEach(param => {
            if (param.type === 'boolean') {
                exampleData += `        '${param.name}': True,\\n`;
            } else if (param.type === 'integer') {
                exampleData += `        '${param.name}': 123,\\n`;
            } else {
                exampleData += `        '${param.name}': 'example_${param.name}',\\n`;
            }
        });

        return `import requests
import json
from typing import Dict


def ${functionName}(base_url: str, access_token: str, data: Dict) -> Dict:
    """${functionName} using the API"""
    url = f"{base_url}${endpoint}"
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.${method.toLowerCase()}(
            url,
            headers=headers,
            json=data,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.RequestException as e:
        raise Exception(f"Network error: {e}")


def main():
    data = {
${exampleData}    }
    
    try:
        result = ${functionName}(
            'https://develop.okd.finance/api',
            'YOUR_ACCESS_TOKEN',
            data
        )
        
        print("${functionName} completed successfully!")
        print(f"Result: {json.dumps(result, indent=2)}")
        
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()`;
    }
}

// Navigation updater
class NavigationUpdater {
    static updateNavigation(apiName, displayName) {
        const configPath = 'docs/.vitepress/config.ts';

        if (!fs.existsSync(configPath)) {
            console.log('❌ VitePress config file not found');
            return false;
        }

        let configContent = fs.readFileSync(configPath, 'utf8');

        // Find the API Reference section
        const apiReferenceRegex = /(\\s+)text: 'API Reference',\\s*\\n\\s*items: \\[([\\s\\S]*?)\\n(\\s+)\\]/;
        const match = configContent.match(apiReferenceRegex);

        if (!match) {
            console.log('❌ Could not find API Reference section');
            return false;
        }

        const existingItems = match[2];

        // Check if already exists
        const apiLinkRegex = new RegExp(`'link': '/en/api/${apiName}'`, 'g');
        if (apiLinkRegex.test(existingItems)) {
            console.log(`ℹ️  ${displayName} already exists in navigation`);
            return true;
        }

        // Add after Overview
        const overviewRegex = /(\\s+{\\s*\\n\\s+'text': 'Overview',\\s*\\n\\s+'link': '\\/en\\/api\\/overview'\\s*\\n\\s+},)/;
        const overviewMatch = existingItems.match(overviewRegex);

        if (overviewMatch) {
            const newEntry = `${overviewMatch[1]}\\n                        {\\n                            'text': '${displayName}',\\n                            'link': '/en/api/${apiName}'\\n                        },`;

            const updatedItems = existingItems.replace(overviewRegex, newEntry);
            const updatedSection = `${match[1]}text: 'API Reference',\\n${match[1]}items: [${updatedItems}\\n${match[3]}]`;

            configContent = configContent.replace(apiReferenceRegex, updatedSection);

            fs.writeFileSync(configPath, configContent);
            console.log(`✅ Added ${displayName} to navigation`);
            return true;
        }

        return false;
    }
}

// Main generator function
async function generateAPI(pathFilter, apiName) {
    console.log(`🚀 Generating API component for paths containing "${pathFilter}"...`);

    // Mock endpoints for user API
    const mockEndpoints = [
        {
            path: '/user/flags',
            method: 'put',
            summary: 'Set Profile Flags',
            description: 'Set profile flags of current user',
            parameters: [
                { name: 'flags', type: 'integer', description: 'Profile flags value' }
            ]
        },
        {
            path: '/user/notifications',
            method: 'patch',
            summary: 'Subscribe to Notifications',
            description: 'Subscribe to notifications',
            parameters: [
                { name: 'enabled', type: 'boolean', description: 'Enable or disable notifications' }
            ]
        },
        {
            path: '/user/profile',
            method: 'patch',
            summary: 'Subscribe to Profile Events',
            description: 'Subscribe to profile events',
            parameters: [
                { name: 'subscribe', type: 'boolean', description: 'Subscribe to profile events' }
            ]
        }
    ];

    console.log(`📊 Found ${mockEndpoints.length} endpoints`);

    // Generate display name
    const displayName = apiName.charAt(0).toUpperCase() + apiName.slice(1) + ' API';
    const componentName = `Interactive${displayName.replace(/\\s+/g, '')}`;

    console.log('📝 Creating component...');

    // Generate Vue component
    const { generateVueComponent } = require('./generate-vue-component.cjs');
    await generateVueComponent(componentName, displayName, mockEndpoints, apiName);

    // Update navigation
    NavigationUpdater.updateNavigation(apiName, displayName);

    console.log('🎉 API generation completed!');
}

// Check command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('Usage: node universal-api-generator.cjs <path-filter> <api-name>');
    console.log('Example: node universal-api-generator.cjs "/user/" users');
    process.exit(1);
}

const pathFilter = args[0];
const apiName = args[1];

generateAPI(pathFilter, apiName).catch(console.error); 