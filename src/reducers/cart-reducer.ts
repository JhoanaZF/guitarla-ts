import { db } from '../data/db'
import { CartItem, Guitar } from '../types'

export type CartAction =
  | { type: 'add-to-card'; payload: { item: Guitar } }
  | { type: 'remove-from-card'; payload: { item: Guitar['id'] } }
  | { type: 'decrease-quantity'; payload: { item: Guitar['id'] } }
  | { type: 'increase-quantity'; payload: { item: Guitar['id'] } }
  | { type: 'clear-cart' }

export type CartState = {
  data: Guitar[]
  cart: CartItem[]
}

const initialCart = () => {
  const localStorageCart = localStorage.getItem('cart')
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
  data: db,
  cart: initialCart()
}

const MAX_ITEM = 5
const MIN_ITEM = 1

export const cartReducer = (state: CartState = initialState, action: CartAction) => {
  if (action.type === 'add-to-card') {
    const itemExists = state.cart.find((guitar) => guitar.id === action.payload.item.id)
    let updateCart: CartItem[] = []
    if (itemExists >= 0) {
      updateCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < MAX_ITEM) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        } else {
          return item
        }
      })
    } else {
      const newItem: CardItem = { ...action.payload.item, quantity: 1 }
      updateCart = [...state.cart, newItem]
    }
    return {
      ...state,
      cart: updateCart
    }
  }
  if (action.type === 'remove-from-card') {
    const updateCart = state.cart.filter((item) => item.id !== action.payload.id)
    return {
      ...state,
      cart: updateCart
    }
  }
  if (action.type === 'decrease-quantity') {
    const updateCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEM) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    return {
      ...state,
      cart: updateCart
    }
  }
  if (action.type === 'increase-quantity') {
    const updateCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEM) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })

    return {
      ...state,
      cart: updateCart
    }
  }
  if (action.type === 'clear-cart') {
    return {
      ...state,
      cart: []
    }
  }
  return state
}
