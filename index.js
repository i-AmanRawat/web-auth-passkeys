const express = require("express");
const crypto = require("node:crypto");
const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} = require("@simplewebauthn/server");
const { error } = require("node:console");

// if (!globalThis.crypto) {
//   globalThis.crypto = crypto;
// }

const PORT = 3000;
const app = express();

app.use(express.static("./public"));
app.use(express.json());

//state
const userStore = {};
const challengeStore = {};

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const id = `user_${Date.now()}`;

  const user = {
    id,
    username,
    password,
  };

  userStore[id] = user;

  console.log("User registered successfully ! : ", userStore[id]);

  return res.json({ id });
});

app.post("/register-challenge", async (req, res) => {
  const { userId } = req.body;

  if (!userStore[`${userId}`]) {
    console.log("hello world from inside");
    return res.status(404).json({ error: "user not found" });
  }

  user = userStore[userId];

  const options = await generateRegistrationOptions({
    rpID: "localhost",
    rpName: "my passkey app",
    userName: user.username,
  });

  challengeStore[userId] = options.challenge;

  return res.json({ options: options });
});

app.post("/register-verify", async (req, res) => {
  const { userId, cred } = req.body;
  if (!userStore[userId])
    return res.status(404).json({ error: "user not found!" });

  const user = userStore[userId];
  const challenge = challengeStore[userId];

  const verificationResult = await verifyRegistrationResponse({
    expectedChallenge: challenge,
    expectedOrigin: "http://localhost:3000",
    expectedRPID: "localhost",
    response: cred,
  });

  if (!verificationResult.verified)
    return res.json({ error: "could not verify" });

  userStore[userId].passkey = verificationResult.registrationInfo;

  return res.json({ verified: true });
});

app.post("/login-challenge", async (req, res) => {
  const { userId } = req.body;

  if (!userStore[userId])
    return res.status(404).json({ error: "user not found!" });

  const options = await generateAuthenticationOptions({
    rpID: "localhost",
  });

  challengeStore[userId] = options.challenge;

  return res.json({ options });
});

app.post("/login-verify", async (req, res) => {
  const { userId, cred } = req.body;

  if (!userStore[userId])
    return res.status(404).json({ error: "user not found!" });

  const user = userStore[userId];
  const challenge = challengeStore[userId];

  const verification = await verifyAuthenticationResponse({
    expectedChallenge: challenge,
    expectedOrigin: "http://localhost:3000",
    expectedRPID: "localhost",
    response: cred,
    authenticator: user.passkey,
  });

  if (!verification.verified)
    return res.json({ error: "something went wrong!" });

  //login user : jwt session
  return res.json({ success: true, userId });
});

app.listen(PORT, () => console.log(`server running at PORT : ${PORT}`));
