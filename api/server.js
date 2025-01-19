const express = require('express');
const cors = require('cors');
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

const app = express();
const client = new SecretManagerServiceClient();

app.use(cors());
app.use(express.json());

app.post('/api/get-secret', async (req, res) => {
  try {
    const { secretName } = req.body;
    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    const name = `projects/${projectId}/secrets/${secretName}/versions/latest`;
    
    const [version] = await client.accessSecretVersion({
      name: name,
    });
    
    const payload = version.payload.data.toString();
    res.json({ value: payload });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
