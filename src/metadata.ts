/* eslint-disable */
export default async () => {
    const t = {
        ["./users/user.entity"]: await import("./users/user.entity"),
        ["./weather/action.entity"]: await import("./weather/action.entity"),
        ["./auth/token.entity"]: await import("./auth/token.entity"),
        ["./auth/auth.response"]: await import("./auth/auth.response"),
        ["./weather/weather.response"]: await import("./weather/weather.response")
    };
    return { "@nestjs/swagger": { "models": [[import("./auth/login.dto"), { "LoginDto": { login: { required: true, type: () => String }, password: { required: true, type: () => String, pattern: "/(?=.*[.,!_])(?=.{6,})/" } } }], [import("./weather/action.entity"), { "Action": { id: { required: true, type: () => Number }, actionTime: { required: true, type: () => Date }, tempC: { required: false, type: () => Number }, resultStatus: { required: true, type: () => Number }, user: { required: true, type: () => t["./users/user.entity"].User } } }], [import("./auth/token.entity"), { "Token": { id: { required: true, type: () => Number }, apiToken: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, user: { required: true, type: () => t["./users/user.entity"].User } } }], [import("./users/user.entity"), { "User": { id: { required: true, type: () => Number }, login: { required: true, type: () => String }, password: { required: true, type: () => String }, fio: { required: true, type: () => String }, actions: { required: true, type: () => [t["./weather/action.entity"].Action] }, tokens: { required: true, type: () => [t["./auth/token.entity"].Token] } } }], [import("./auth/register.dto"), { "RegisterDto": { login: { required: true, type: () => String }, password: { required: true, type: () => String, pattern: "/(?=.*[.,!_])(?=.{6,})/" }, fio: { required: true, type: () => String } } }]], "controllers": [[import("./auth/auth.controller"), { "AuthController": { "login": { type: t["./auth/auth.response"].AuthResponse }, "register": { type: t["./auth/auth.response"].AuthResponse } } }], [import("./weather/weather.controller"), { "WeatherController": { "getWeather": { type: t["./weather/weather.response"].WeatherResponse } } }]] } };
};