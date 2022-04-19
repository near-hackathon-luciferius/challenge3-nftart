import React from 'react';

export default function SignIn() {
  return (
    <>
      <p>
          This app demonstrates a key element of NEAR’s UX: once an app has
          permission to make calls on behalf of a user (that is, once a user
          signs in), the app can make calls to the blockchain for them without
          prompting extra confirmation. So you’ll see that if you use the hello
          button, you will get a response right away.
      </p>
      <p>
          But if you do use the remember me button, then NEAR will double-check that
          you’re ok with sending money to this app for remebering the name.
      </p>
      <p>
          Go ahead and sign in to try it out!
      </p>
    </>
  );
}
