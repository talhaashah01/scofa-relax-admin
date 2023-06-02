import { stats1, stats2, stats3, userImage } from "../Assets/images";

export const currentUser = {
  image: userImage,
  name: "Mark Carson",
  email: "abc@xyz.com",
};

export const stats = [
  {
    id: 1,
    image: stats3,
    number: "150",
    text: "Users",
    // change: "100",
  },
  {
    id: 2,
    image: stats3,
    number: "80",
    text: "Premium Users",
    // change: "75",
  },
  {
    id: 3,
    image: stats3,
    number: "20",
    text: "Sounds",
    // change: "22",
  },
  {
    id: 4,
    image: stats3,
    number: "15",
    text: "Meditations",
    // change: "22",
  },
  {
    id: 5,
    image: stats3,
    number: "7",
    text: "Stories",
    // change: "22",
  },
  {
    id: 6,
    image: stats3,
    number: "19",
    text: "Articles",
    // change: "22",
  },
];

export const soundData = [
  {
    id: 1,
    title: "White Noise",
    image: userImage,
    thumbnail: userImage,
    type: "free",
  },
  {
    id: 2,
    title: "Night",
    image: userImage,
    thumbnail: userImage,
    type: "free",
  },
  {
    id: 3,
    title: "Piano",
    image: userImage,
    thumbnail: userImage,
    type: "premium",
  },
  {
    id: 4,
    title: "Coffee Shop",
    image: userImage,
    thumbnail: userImage,
    type: "premium",
  },
];

export const notifications = [
  {
    id: 1,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Dec 19, 2022",
    time: "02:00 PM",
    unread: true,
  },
  {
    id: 2,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry and typesetting industry.",
    date: "Dec 19, 2022",
    time: "01:40 PM",
    unread: true,
  },
  {
    id: 3,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry, Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Dec 18, 2022",
    time: "09:13 PM",
    unread: false,
  },
  {
    id: 4,
    text: "Lorem Ipsum is text of the printing and typesetting industry.",
    date: "Dec 18, 2022",
    time: "06:38 PM",
    unread: false,
  },
  {
    id: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    date: "Dec 18, 2022",
    time: "01:49 AM",
    unread: false,
  },
  {
    id: 6,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Dec 18, 2022",
    time: "01:05 AM",
    unread: false,
  },
  {
    id: 7,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Dec 17, 2022",
    time: "10:52 PM",
    unread: false,
  },
];
