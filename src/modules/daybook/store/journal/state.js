const date1 = new Date();
date1.setDate(date1.getDate() - 15);
const date2 = new Date();
date2.setDate(date2.getDate() - 5);
const date3 = new Date();
date3.setDate(date3.getDate() - 1);

const dates = [date1, date2, date3];

export default () => ({
  isLoading: true,
  entries: [
    {
      id: "1",
      date: dates[0].toDateString(),
      picture: null,
      text: "Officia irure id excepteur labore. Reprehenderit esse aliqua nulla amet reprehenderit culpa aute dolore consequat aute consequat nostrud. Culpa id tempor sint voluptate anim reprehenderit fugiat.",
    },
    {
      id: "2",
      date: dates[1].toDateString(),
      picture: null,
      text: "Ut laborum aute proident laboris occaecat do quis nulla. Ut nostrud enim do ipsum ut aliqua reprehenderit ipsum labore adipisicing do mollit esse culpa. Minim occaecat non nostrud dolor incididunt enim. Sit quis elit sit esse est ipsum commodo eu sint do ipsum mollit laborum. Nulla ullamco est voluptate et nulla sunt.",
    },
    {
      id: "3",
      date: dates[2].toDateString(),
      picture: null,
      text: "Eiusmod commodo do nisi est pariatur. Id dolor fugiat ut nulla. Tempor veniam commodo cillum proident officia do pariatur proident eu culpa nostrud ex amet. Enim Lorem cupidatat laboris in irure Lorem id ex esse aliquip. Ea ullamco ut adipisicing dolore sunt sit aliquip cillum pariatur et adipisicing cupidatat cillum. Do eiusmod minim dolore esse.",
    },
  ],
});
