"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserName = void 0;
const validateUserName = (options) => {
    if (options.username.includes("@")) {
        return [
            {
                field: "username",
                msg: "cannot include '@' in username",
            },
        ];
    }
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                msg: "invalid email format",
            },
        ];
    }
    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                msg: "username must be longer than 2 characters",
            },
        ];
    }
    if (options.password.length <= 6) {
        return [
            {
                field: "password",
                msg: "password must be longer than 6 characters",
            },
        ];
    }
    return null;
};
exports.validateUserName = validateUserName;
//# sourceMappingURL=validateUserInput.js.map