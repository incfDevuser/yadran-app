import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import pool from "./config/db.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const account = profile._json;
      let usuario = {};
      try {
        const usuario_actual = await pool.query(
          "SELECT * FROM usuarios WHERE google_id = $1",
          [account.sub]
        );

        if (usuario_actual.rows.length === 0) {
          const email =
            profile.emails && profile.emails.length > 0
              ? profile.emails[0].value
              : account.email;

          await pool.query(
            `INSERT INTO usuarios(nombre, google_id, email)
               VALUES ($1, $2, $3)`,
            [
              account.name,
              account.sub,
              email,
            ]
          );

          const nuevoUsuario = await pool.query(
            "SELECT * FROM usuarios WHERE google_id = $1",
            [account.sub]
          );

          usuario = {
            id: nuevoUsuario.rows[0].id,
            nombre: account.name,
            email: email,
            isAdmin: nuevoUsuario.rows[0].isadmin,
          };
        } else {
          usuario = {
            id: usuario_actual.rows[0].id,
            nombre: usuario_actual.rows[0].nombre,
            email: usuario_actual.rows[0].email,
            isAdmin: usuario_actual.rows[0].isadmin,
          };
        }
        done(null, usuario);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
      id,
    ]);
    if (usuario.rows.length > 0) {
      done(null, usuario.rows[0]);
    } else {
      done(new Error("Usuario no encontrado"));
    }
  } catch (error) {
    done(error);
  }
});
