import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: "First name is required",
    },
    last_name: {
      type: String,
      required: "Last name is required",
    },
    email: {
      type: String,
      required: "Email is required",
    },
    password_hash: {
      type: String,
      required: "Password is required",
    },
    phone: {
      type: String,
      required: "Phone is required",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: "Role is required",
    },
    address: {
      type: {
        street: {
          type: String,
          required: "Street is required",
        },
        city: {
          type: String,
          required: "City is required",
        },
        governorate: {
          type: String,
          required: "Governorate is required",
        },
        country: {
          type: String,
          required: "Country is required",
        },
        notes: {
          type: String,
        },
      },
    },
    payment_method: {
      type: {
        card_number: {
          type: String,
          required: "Card number is required",
        },
        expiry_date: {
          type: String,
          required: "Expiry date is required",
        },
        cvv: {
          type: String,
          required: "CVV is required",
        },
        notes: {
          type: String,
        },
      },
    },
    token: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: "Verification is required",
    },
    verify_email_token: {
      type: String,
    },
    otp: {
      type: {
        otp: {
          type: String,
        },
        expiry_date: {
          type: Date,
        },
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

// create a new user
export const createUser = async (user) => {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get all users
export const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get a single user By Id
export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// get a single user By Email
export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// update a user
export const updateUser = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// delete a user
export const deleteUser = async (id) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
