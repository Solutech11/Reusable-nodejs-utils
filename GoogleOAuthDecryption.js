const { OAuth2Client } = require('google-auth-library');

// Create an instance of the OAuth2Client with your credentials
const client = new OAuth2Client({
  clientId: process.env.GoogleClientID,
  clientSecret: process.env.GoogleClientSecret,
});

async function verifyIdToken(idToken) {
  try {
    // Verify the ID token using the OAuth2Client instance
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GoogleClientID, // Replace with your client ID
    });

    // The verified payload contains user information
    const payload = ticket.getPayload();

    // Access user details, including the profile image URL
    const userId = payload.sub;
    const email = payload.email;
    const name = payload.name;
    const profileImage = payload.picture; // This contains the profile image URL

    // You can return the user details or use them as needed
    
    return {
      userId,
      email,
      name,
      profileImage,
    };
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return {Error:true}
  }
}

module.exports=verifyIdToken

