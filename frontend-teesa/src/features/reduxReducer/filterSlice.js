import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'filters/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      // const { marcaQuery } = filters;
      // const { precioQuery } = filters;
      const queryParams = new URLSearchParams(filters).toString();
      console.log(`https://servidor-teesa.onrender.com/products?${queryParams}`);
      const response = await axios.get(
        `https://servidor-teesa.onrender.com/products?${queryParams}`
      );
      console.log(response + 'respuesta filtros');
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPaginationData = createAsyncThunk(
  'products/getPaginationData',
  async (number) => {
    try {
      const response = await axios.get(
        `https://servidor-teesa.onrender.com/products?page=${number}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: {},
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addFilter: (state, action) => {
      state.filters = action.payload;
    },
    sortByName: (state, action) => {
      state.products.products.sort((a, b) => {
        if (action.payload === 'ascendente') {
          return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
        } else if (action.payload === 'descendente') {
          return b.nombre.toLowerCase().localeCompare(a.nombre.toLowerCase());
        }
        return 0;
      });
    },
    sortByPrice: (state, action) => {
      state.products.products.sort((a, b) => {
        if (action.payload === 'precio_min') {
          return a.precio - b.precio;
        } else if (action.payload === 'precio_max') {
          return b.precio - a.precio;
        }
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPaginationData.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addFilter, sortByName, sortByPrice } = filtersSlice.actions;

export default filtersSlice.reducer;
