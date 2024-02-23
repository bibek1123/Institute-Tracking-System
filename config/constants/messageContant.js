module.exports = {
    MESSAGE: {
        ALL_FIELDS_REQUIRED: 'All fields are required.',
        EMAIL_ALREADY_EXIST: "Email already exists.",
        INVALID_PASSWORD: "Invalid password.",
        YOU_EXCEEDED_LOGIN_ATTEMPTS: 'You exceeded login attempts.Now please try login after 5 minutes.',
        NOW_YOU_CAN_TRY_LOGIN: "Now you can try login.",
        INVALID_CREADIENTIALS: "Invalid credientials.",
        CURRENT_PASSWORD_WRONG: "Current password is wrong.",
        EMAIL_DOES_NOT_EXIST: "Entered email does't exist in our database.",
        EMAIL_IS_REQUIRED: "Email is required.",
        INVALID_TOKEN: "Invalid token.",
        INSTRUCTOR_NOT_FOUND: "Instructor not found.",
        UNAUTHORIZED: "Unauthorized: No token provided.",
        DATABASE_CONNECTION_FAILED: "Database connection failed.",
        YOU_ARE_REGISTERED_SUCCESSFULLY: "You are registered successfully.",
        YOU_ARE_LOGIN_SUCCESSFULLY: "You are logged in successfully.",
        PASSWORD_RESET_SUCCESSFULLY: "Password reset successfully.",
        DATABASE_CONNECTION_SUCCESSFULLY: "Database connected successfully.",
        ALL_INSTRUCTOR_ACCOUNTS_FETCHED_SUCCESSFULLY: "All instructor's account have been fetched successfully.",
        YOUR_ACCOUNT_FETCHED_SUCCESSFULLY: "Your account has been fetched successfully.",
        YOUR_PROFILE_RETRIEVE_SUCCESSFULLY: "Your Profile has been retrieved successfully.",
        YOUR_ACCOUNT_DELETED_SUCCESSFULLY: "Your account has been deleted successfully.",
        YOUR_ACCOUNT_UPDATED_SUCCESSFULLY: "Your account has been updated successfully.",
        YOUR_ACCOUNT_CAN_NOT_BE_DELETED: "You don't have permission to delete this account.",
        PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER: "Password must have at least 6 characters, one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace.",
        NEW_PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER: "New password must have at least 6 characters, one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace.",
        CURRENT_PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER: "Current password must have at least 6 characters, one digit, one lowercase letter, one uppercase letter, one special character, and no whitespace.",
        CONFIRM_PASSWORD_MUST_BE_VALIDATE: "Confirm password must be validate and same as the password."
    },
    CHECKED_IN_MESSAGE: {
        CHECKED_IN_SUCCESSFULLY: "Checked in Successfully.",
        ALREADY_CHECKED_IN: "Instructor has already checked in for today.",
        CANNOT_CHECKED_IN: "Cannot check in. Previous check-in not checked out.",
        OVERLAPING_CHEKED_IN: "Cannot check in. Overlapping check-in time."
    },

    CHECKED_OUT_MESSAGE: {
        CHECKED_OUT_SUCCESSFULLY: "Checked out Successfully.",
        NO_CHECKED_IN_FOUND: 'Cannot check out. No previous check-in found.',
        ALREADY_CHECKEDOUT: "Instructor already checked out today.",
        EARLIE_CHECKED_OUT: 'Cannot check out. Check-out time cannot be before or eqaul check-in time.'
    },

    MONTHLY_REPORT_MESSAGE: {
        YOUR_MONTHLY_REPORT_FETCH_SUCCESSFULLY: 'Your monthly report has been fetched succesfully.'
    }

}