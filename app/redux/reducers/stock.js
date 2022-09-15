import {
  SEARCH_STOCK
} from '../actions/types';

const INITIAL_STATE = {
  stocktext:"",
    stock: [
        {
          imageUri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/curd_sandwich_2OSX-FPKdK.jpg',
          name: 'Curd Sandwich',
          price: 8.49,
          rating:3.5,
          quantity:1,
          id:1,
          description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imageUri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/pizza_1_8tnSSiXtKJ.jpg',
          name: 'Pizza Margarita 35cm',
          price: 10.99,
          rating:4.5,
          id:2,
          quantity:1,
          description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imageUri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/cake_IHb3yF-QM.jpg',
          name: 'Chocolate Cake',
          price: 4.99,
          quantity:1,
          id:3,
          rating:3.5,
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imageUri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/curd_sandwich_2OSX-FPKdK.jpg',
          name: 'Curd Sandwich',
          price: 8.49,
          rating:3.5,
          id:4,
          quantity:1,
          description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imageUri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/pizza_1_8tnSSiXtKJ.jpg',
          name: 'Pizza Margarita 35cm',
          price: 10.99,
          quantity:1,
          rating:4.5,
          id:5,
          description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imageUri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/cake_IHb3yF-QM.jpg',
          name: 'Chocolate Cake',
          price: 4.99,
          quantity:1,
          id:6,
          rating:3.5,
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imageUri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/curd_sandwich_2OSX-FPKdK.jpg',
          name: 'Curd Sandwich',
          price: 8.49,
          quantity:1,
          id:7,
          rating:3.5,
          description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imageUri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/pizza_1_8tnSSiXtKJ.jpg',
          name: 'Pizza Margarita 35cm',
          price: 10.99,
          quantity:1,
          id:8,
          rating:4.5,
          description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
        {
          imageUri: 'https://ik.imagekit.io/6bxllfhzy/foodvila/assets/img/cake_IHb3yF-QM.jpg',
          name: 'Chocolate Cake',
          price: 4.99,
          quantity:1,
          id:9,
          rating:3.5,
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        },
      ]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SEARCH_STOCK:
      return{...state,stock:state.stock.filter(item => {
       return state.stocktext == "" ? state.stock : item.name.includes(action.payload);
       
      }), stocktext:action.payload}
    default:
      return state;
  }
}