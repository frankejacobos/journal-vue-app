export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      picture: null,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio magni quae accusamus molestiae quidem provident eaque dicta",
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      picture: null,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio magni quae accusamus molestiae quidem provident eaque dicta",
    },
    {
      id: new Date().getTime() + 2000,
      date: new Date().toDateString(),
      picture: null,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio magni quae accusamus molestiae quidem provident eaque dicta",
    },
  ],
});
