# API Spec

## Running API tests locally

```bash
APIURL=http://localhost:3000/api ./run-api-tests.sh
```
<details>
  <summary>run-api.tests.sh</summary>

  ```bash
  #!/usr/bin/env bash
  set -x

  SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

  APIURL=${APIURL:-https://conduit.productionready.io/api}
  USERNAME=${USERNAME:-u`date +%s`}
  EMAIL=${EMAIL:-$USERNAME@mail.com}
  PASSWORD=${PASSWORD:-password}

  npx newman run $SCRIPTDIR/Conduit.postman_collection.json \
    --delay-request 500 \
    --global-var "APIURL=$APIURL" \
    --global-var "USERNAME=$USERNAME" \
    --global-var "EMAIL=$EMAIL" \
    --global-var "PASSWORD=$PASSWORD"
  ```

</details>

---
<br/>

## Considerations for your backend with CORS

If the backend is about to run on a different host/port than the frontend, make sure to handle `OPTIONS` too and return correct `Access-Control-Allow-Origin` and `Access-Control-Allow-Headers` (e.g. `Content-Type`).

### **Authentication Header**

`Authorization: Token jwt.token.here`

---
<br/>

## JSON Objects returned by API

Make sure the right content type like `Content-Type: application/json; charset=utf-8` is correctly returned.

<details>
  <summary>User (for authentication)</summary>

  ```json
  {
    "user": {
      "email": "jake@jake.jake",
      "token": "jwt.token.here",
      "username": "jake",
      "bio": "I work at statefarm",
      "image": null
    }
  }
  ```

</details> 

<details>
  <summary>Errors and Status Codes</summary>

  ```json
  {
    "errors":{
      "body": [
        "can't be empty"
      ]
    }
  }
  ```

  - **Other status codes**
    - 401 for Unauthorized requests, when a request requires authentication but it isn't provided
    - 403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action
    - 404 for Not found requests, when a resource can't be found to fulfill the request

</details>

---

<br/>

## Endpoints

<details>
  <summary>로그인 (Authentication)</summary>

  `POST /api/users/login`

  - Example request body

      ```json
      {
        "user":{
          "email": "jake@jake.jake",
          "password": "jakejake"
        }
      }
      ```

  - 필수 항목 :  `email` , `password`
  - 인증 필요 없음, 해당 조건에 만족하는 User 반환

</details>

<details>

  <summary>회원가입</summary>

  `POST /api/users`

  - Example request body
  
    ```json
    {
      "user":{
        "username": "Jacob",
        "email": "jake@jake.jake",
        "password": "jakejake"
      }
    }
    ```

  - 필수 항목 :  `email` , `username` , `password`
  - 인증 필요 없음, 가입 된 User 반환

</details>

<details>

  <summary>회원조회 (Current user)</summary>

  `GET /api/user`

  - 인증 필요, 현제 로그인된 User 반환

</details>





