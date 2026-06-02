const getPosts = async () => {
  try {
    const response = await fetch(
      'https://cloud.codesupply.co/endpoint/react/data.json'
    );
    if (!response.ok) {
      throw new Error('Could not fetch data Now !');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error, 'There is an issue !');
  }
};
getPosts();
