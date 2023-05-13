import { server } from '../store';
import axios from 'axios';

export const updateProfile = (name, email) => async dispatch => {
  try {
    dispatch({ type: 'updateProfileRequest' });

    const { data } = await axios.put(
      `${server}/updateprofile`,
      {
        name,
        email,
      },
      {
        headers: {
          'Content-type': 'application/json',
        },

        withCredentials: true,
      }
    );

    dispatch({ type: 'updateProfileSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfileFail',
      payload: error.response.data.message,
    });
  }
};

export const updateProfilePicture = formdata => async dispatch => {
  try {
    dispatch({ type: 'updateProfilePictureRequest' });

    const { data } = await axios.put(
      `${server}/updateprofilepicture`,
      formdata,
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },

        withCredentials: true,
      }
    );

    dispatch({ type: 'updateProfilePictureSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'updateProfilePictureFail',
      payload: error.response.data.message,
    });
  }
};

export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    dispatch({ type: 'changePasswordRequest' });

    const { data } = await axios.put(
      `${server}/changepassword`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          'Content-type': 'application/json',
        },

        withCredentials: true,
      }
    );

    dispatch({ type: 'changePasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'changePasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const forgetPassword = email => async dispatch => {
  try {
    dispatch({ type: 'forgetPasswordRequest' });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/forgetpassword`,
      {
        email,
      },
      config
    );

    dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'forgetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async dispatch => {
  try {
    dispatch({ type: 'resetPasswordRequest' });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/resetpassword/${token}`,
      {
        password,
      },
      config
    );

    dispatch({ type: 'resetPasswordSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'resetPasswordFail',
      payload: error.response.data.message,
    });
  }
};

export const addToPlaylist = id => async dispatch => {
  try {
    dispatch({ type: 'addToPlaylistRequest' });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },

      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/addtoplaylist`,
      {
        id,
      },
      config
    );

    dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'addToPlaylistFail',
      payload: error.response.data.message,
    });
  }
};

export const removeFromPlaylist = id => async dispatch => {
  try {
    dispatch({ type: 'removeFromPlaylistRequest' });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.delete(
      `${server}/removefromplaylist?id=${id}`,
      config
    );

    dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'removeFromPlaylistFail',
      payload: error.response.data.message,
    });
  }
};
