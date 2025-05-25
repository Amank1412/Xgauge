document.getElementById('followersForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const resultDiv = document.getElementById('result');
  const errorDiv = document.getElementById('error');
  resultDiv.textContent = '';
  errorDiv.textContent = '';

  if (!username) {
    errorDiv.textContent = 'Please enter a username.';
    return;
  }

  resultDiv.textContent = 'Loading...';

  try {
    // Make sure your backend is running on the same domain or adjust the URL
    const response = await fetch(`/api/followers/${username}`);
    if (!response.ok) throw new Error('User not found or API error');
    const data = await response.json();
    resultDiv.textContent = `@${data.username} has ${data.followers} followers (as of ${data.date})`;
  } catch (err) {
    resultDiv.textContent = '';
    errorDiv.textContent = err.message || 'Something went wrong.';
  }
});
