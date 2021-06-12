### basic flow

> user clicks sign in (offline / online)
> server checks against database  
> passwords match - auth token is randomly generated, expires in 24 hours  
> set an auth token in database  
> set as cookie, along with all other user info  
> isAuthenticated returns true is user info exists and is not expired

### Other notes

> any requests will extend to 24 hours

### brain thoughts

{user: Brain, otherInfo: other, cookie: hashed?}

Separate & clarify problem statement

- be able to explain it simply - mom, dad, sister

### Security Problem statements:

1. If someone gets a key,
2. If user logs in, refreshes the page, closes out the tab, when they come back,
   they should still be "logged in"

- Cookie / localstorage
- Store user info, along with token (make API calls)
  - expiration date, 24 hours
- Store api token in backend

3. How can I safely store data on the in-Browser database?

- encrypt using AES, decrypt when retrieving it
