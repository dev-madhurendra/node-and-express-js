const registerUserJson = {
  _id: '12345',
  firstname: 'John',
  lastname: 'Doe',
  username: 'john_doe_new',
  email: 'john.doenew@example.com',
  avatar_url: 'https://example.com/avatar.jpg',
  shortbio: 'Just a regular guy.',
}

const loginUserJson = {
  _id: '12345',
  email: 'john.doenew@example.com',
  matchPassword: jest.fn().mockResolvedValue(true), 
}

const loginCreds = {
  email: 'john.doenew@example.com',
  password: 'Test@123',
}

const loginWrongCreds = {
  email: 'john.doenew@example.com',
  password: 'Password@123',
}

const createBlogJson = {
  id: "12345",
  title: "Data Science for Beginners",
  subtitle: "Getting Started with Data Analysis and Machine Learning",
  imageUsed: "https://example.com/images/data-science.jpg",
  content: "This blog introduces the basics of data science, covering essential concepts in data analysis, machine learning, and the tools commonly used in the industry."
}

module.exports = {
  registerUserJson,
  loginUserJson,
  loginCreds,
  loginWrongCreds,
  createBlogJson,
};
