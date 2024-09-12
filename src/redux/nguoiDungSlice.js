import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../services/nguoiDung.service";

// tạo action sử dụng thunk:
// tham số 1 là tên type dùng để phân biệt với các action còn lại (cách đặt tên name reducer/tên action)
// tham số 2 là hàm bất đồng bộ để lấy dữ liệu, async nhận vào 2 tham số cần gửi lên store, 1 là dữ liệu từ cpn cần gửi lên store, 2 là ThunkAPI
export const getValueUserApi = createAsyncThunk(
  "nguoiDung/getValueUserApi",
  async (_, ThunkAPI) => {
    const response = await nguoiDungService.getAllUsers();
    console.log(response);
    // để đưa được dữ liệu cần lấy vào payload của action bên dưới reducer, ta cần 1 lệnh return (return chuỗi nằm trong data.content)
    return response.data.content;
  }
);

const initialState = {
  listUsers: [],
};

const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {},
  // extraReducers sẽ bắt và xử lý các action liên quan đến thunk
  extraReducers: (builder) => {
    // tham số builder trong hàm extraReducers dùng để tạo ra các phương thức bắt được các trường hợp fulfilled/pending/rejected xảy ra đối với action getValueUserApi
    builder.addCase(getValueUserApi.fulfilled, (state, action) => {
      console.log(action); //payload sẽ trả về dữ liệu mà getValueUserApi lấy được từ api (có thể chọn dữ liệu muốn trả về tùy thích)
      state.listUsers = action.payload;
    });
    builder.addCase(getValueUserApi.pending, (state, action) => {
      console.log("Tôi đang chờ xử lý");
    });
    builder.addCase(getValueUserApi.rejected, (state, action) => {
      console.log("Tôi bị lỗi");
    });
  },
});

export const {} = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
