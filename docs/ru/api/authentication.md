---
layout: page
---

# API Аутентификации

<GlobalAuth />

## Проверить существование аккаунта по токену Firebase.
No description available

<InteractiveAuthenticationAPIEndpoint1 />

## Отправить код подтверждения на email.
No description available

<InteractiveAuthenticationAPIEndpoint2 />

## Инициирует операцию по созданию fcm пользователя.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint3 />

## Инициирует операцию по удалению fcm пользователя по ID устройства и fcm.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint4 />

## Получить ссылку Google для входа/регистрации.
No description available

<InteractiveAuthenticationAPIEndpoint5 />

## Перегенерировать пару токенов аутентификации, если токен обновления действителен
! Need refresh token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint6 />

## Инициирует операцию по изменению текущей локали пользователя.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint7 />

## Получить уведомления для пользователя
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint8 />

## Пометить все/группу уведомлений как просмотренные. Тело запроса необязательно.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint9 />

## Удалить все/группу уведомлений. Тело запроса необязательно.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint10 />

## Пометить уведомление как просмотренное.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint11 />

## Inits operation to turn OTP on (one time password) for current user.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint12 />

## Inits operation to turn OTP off (one time password 2FA) for current user by using email and OTP.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint13 />

## Inits operation to change current user password.
Operation is valid only for regular and firebase accounts.
It's no need to set old/new password for firebase account.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint14 />

## Завершает восстановление текущего пароля пользователя.
No description available

<InteractiveAuthenticationAPIEndpoint15 />

## Инициирует восстановление текущего пароля пользователя.
No description available

<InteractiveAuthenticationAPIEndpoint16 />

## Проверить код восстановления.
No description available

<InteractiveAuthenticationAPIEndpoint17 />

## GetProfile возвращает информацию о текущем пользователе.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint18 />

## SetProfile устанавливает некоторые поля в профиле текущего пользователя. Все поля необязательны.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint19 />

## Проверить возможность удаления аккаунта.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint20 />

## Инициирует операцию по удалению аккаунта. Максимальная длина причины - 200.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint21 />

## Подтвердить операцию входа.
No description available

<InteractiveAuthenticationAPIEndpoint22 />

## Выполняет вход пользователя и возвращает пару токенов или операцию входа с подсказками.
No description available

<InteractiveAuthenticationAPIEndpoint23 />

## Войти с помощью запроса Firebase.
No description available

<InteractiveAuthenticationAPIEndpoint24 />

## Войти с помощью запроса Google OAuth2.
No description available

<InteractiveAuthenticationAPIEndpoint25 />

## Повторно отправить коды email/телефона для процесса входа.
Only one of flags should be set.

<InteractiveAuthenticationAPIEndpoint26 />

## Выйти из системы, удалить сессии пользователя и сделать токен недействительным.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint27 />

## Регистрация сохраняет пользователя в базе данных и отправляет URL подтверждения на email.
No description available

<InteractiveAuthenticationAPIEndpoint28 />

## Зарегистрироваться с помощью запроса Google OAuth2.
No description available

<InteractiveAuthenticationAPIEndpoint29 />

## SetProfile устанавливает флаги профиля текущего пользователя.
! Need access token in bearer token authorization

<InteractiveAuthenticationAPIEndpoint30 />

<script setup>
import InteractiveAuthenticationAPIEndpoint1 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint1.vue'
import InteractiveAuthenticationAPIEndpoint2 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint2.vue'
import InteractiveAuthenticationAPIEndpoint3 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint3.vue'
import InteractiveAuthenticationAPIEndpoint4 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint4.vue'
import InteractiveAuthenticationAPIEndpoint5 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint5.vue'
import InteractiveAuthenticationAPIEndpoint6 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint6.vue'
import InteractiveAuthenticationAPIEndpoint7 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint7.vue'
import InteractiveAuthenticationAPIEndpoint8 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint8.vue'
import InteractiveAuthenticationAPIEndpoint9 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint9.vue'
import InteractiveAuthenticationAPIEndpoint10 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint10.vue'
import InteractiveAuthenticationAPIEndpoint11 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint11.vue'
import InteractiveAuthenticationAPIEndpoint12 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint12.vue'
import InteractiveAuthenticationAPIEndpoint13 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint13.vue'
import InteractiveAuthenticationAPIEndpoint14 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint14.vue'
import InteractiveAuthenticationAPIEndpoint15 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint15.vue'
import InteractiveAuthenticationAPIEndpoint16 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint16.vue'
import InteractiveAuthenticationAPIEndpoint17 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint17.vue'
import InteractiveAuthenticationAPIEndpoint18 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint18.vue'
import InteractiveAuthenticationAPIEndpoint19 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint19.vue'
import InteractiveAuthenticationAPIEndpoint20 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint20.vue'
import InteractiveAuthenticationAPIEndpoint21 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint21.vue'
import InteractiveAuthenticationAPIEndpoint22 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint22.vue'
import InteractiveAuthenticationAPIEndpoint23 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint23.vue'
import InteractiveAuthenticationAPIEndpoint24 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint24.vue'
import InteractiveAuthenticationAPIEndpoint25 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint25.vue'
import InteractiveAuthenticationAPIEndpoint26 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint26.vue'
import InteractiveAuthenticationAPIEndpoint27 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint27.vue'
import InteractiveAuthenticationAPIEndpoint28 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint28.vue'
import InteractiveAuthenticationAPIEndpoint29 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint29.vue'
import InteractiveAuthenticationAPIEndpoint30 from '../../.vitepress/theme/components/InteractiveAuthenticationAPIEndpoint30.vue'
import GlobalAuth from '../../.vitepress/theme/components/GlobalAuth.vue'
import SimpleOutline from '../../.vitepress/theme/components/SimpleOutline.vue'
</script>

<SimpleOutline :items="[
  { text: 'Check account existence by firebase token.', anchor: '#check-account-existence-by-firebase-token' },
  { text: 'Send confirmation code to email.', anchor: '#send-confirmation-code-to-email' },
  { text: 'Inits operation to create user fcm.', anchor: '#inits-operation-to-create-user-fcm' },
  { text: 'Inits operation to delete user fcm by device id and fcm.', anchor: '#inits-operation-to-delete-user-fcm-by-device-id-and-fcm' },
  { text: 'Get Google link for lgoin/register.', anchor: '#get-google-link-for-lgoinregister' },
  { text: 'Regenerate a pair of authenticate tokens if refresh token is valid', anchor: '#regenerate-a-pair-of-authenticate-tokens-if-refresh-token-is-valid' },
  { text: 'Inits operation to change current user locale.', anchor: '#inits-operation-to-change-current-user-locale' },
  { text: 'Get notifications for user', anchor: '#get-notifications-for-user' },
  { text: 'Mark all/group of notifications as viewed. Body is optional.', anchor: '#mark-allgroup-of-notifications-as-viewed-body-is-optional' },
  { text: 'Delete all/group of notifications. Body is optional.', anchor: '#delete-allgroup-of-notifications-body-is-optional' },
  { text: 'Mark notification as viewed.', anchor: '#mark-notification-as-viewed' },
  { text: 'Inits operation to turn OTP on (one time password) for current user.', anchor: '#inits-operation-to-turn-otp-on-one-time-password-for-current-user' },
  { text: 'Inits operation to turn OTP off (one time password 2FA) for current user by using email and OTP.', anchor: '#inits-operation-to-turn-otp-off-one-time-password-2fa-for-current-user-by-using-email-and-otp' },
  { text: 'Inits operation to change current user password. Operation is valid only for regular and firebase accounts. It\'s no need to set old/new password for firebase account.', anchor: '#inits-operation-to-change-current-user-password-operation-is-valid-only-for-regular-and-firebase-accounts-its-no-need-to-set-oldnew-password-for-firebase-account' },
  { text: 'Finishes restoration of current user password.', anchor: '#finishes-restoration-of-current-user-password' },
  { text: 'Inits restoration of current user password.', anchor: '#inits-restoration-of-current-user-password' },
  { text: 'Check restoration code.', anchor: '#check-restoration-code' },
  { text: 'GetProfile returns information about current user.', anchor: '#getprofile-returns-information-about-current-user' },
  { text: 'SetProfile sets some fields in profile of current user. All fields are optional.', anchor: '#setprofile-sets-some-fields-in-profile-of-current-user-all-fields-are-optional' },
  { text: 'Check possibility to remove account.', anchor: '#check-possibility-to-remove-account' },
  { text: 'Inits operation to remove account. Reason maximum length is 200.', anchor: '#inits-operation-to-remove-account-reason-maximum-length-is-200' },
  { text: 'Confirm login operation.', anchor: '#confirm-login-operation' },
  { text: 'Logins user and return pair of tokens or login operation with hints.', anchor: '#logins-user-and-return-pair-of-tokens-or-login-operation-with-hints' },
  { text: 'Sign in by firebase request.', anchor: '#sign-in-by-firebase-request' },
  { text: 'Sign in by Google OAuth2 request.', anchor: '#sign-in-by-google-oauth2-request' },
  { text: 'Resend email/phone codes for sign-in process.', anchor: '#resend-emailphone-codes-for-signin-process' },
  { text: 'Logout remove user sessions and makes the token invalid.', anchor: '#logout-remove-user-sessions-and-makes-the-token-invalid' },
  { text: 'Registration save user in database and send verification url to email.', anchor: '#registration-save-user-in-database-and-send-verification-url-to-email' },
  { text: 'Sign up by Google OAuth2 request.', anchor: '#sign-up-by-google-oauth2-request' },
  { text: 'SetProfile sets profile flags of current user.', anchor: '#setprofile-sets-profile-flags-of-current-user' }
]" />
