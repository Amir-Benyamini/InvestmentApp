"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = __importDefault(require("passport-google-oauth2"));
const user_1 = __importDefault(require("./db/user"));
const GoogleStrategy = passport_google_oauth2_1.default.Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: '995999949533-ccacl78u7r6nnv7b2clu3hu7h0qbiuoa.apps.googleusercontent.com',
    clientSecret: 'Dm77mKHuxxiHiqBt_XAJLBBP',
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, cb) => {
    const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        googleID: profile.id
    }; //why i dont have auto complition like he did in the toturial? also how can i check this values myself?
    const user = await user_1.default.findOne({ auth: 'google' }); // how i find the right user so i could query his auth model
}));
