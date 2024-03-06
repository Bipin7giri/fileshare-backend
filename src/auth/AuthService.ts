import { AppDataSource } from "../config/database.config";
import { UserCredential } from "../users/UserCredential.entities";
import { User } from "../users/user.entity";
import { comparePassword, generateHashPassword } from "../utils/hashpassword";
import { generateToken } from "../utils/jwt";
import { type Response } from "express";

export class AuthService {
  constructor(
    private readonly userRepository = AppDataSource.getRepository(User),
    private readonly userCredentialRepository = AppDataSource.getRepository(
      UserCredential,
    ),
  ) {}

  async register({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<User> {
    try {
      const checkIfEmailAlreadyExist: User | null =
        await this.userRepository.findOne({
          where: {
            email,
          },
        });
      if (checkIfEmailAlreadyExist != null) {
        throw new Error("Email already exists");
      }
      const hashedPassword: any = await generateHashPassword(password);
      const userCredentialId: UserCredential =
        await this.userCredentialRepository.save({
          password: hashedPassword,
        });
      const user: User = await this.userRepository.save({
        email,
        userCredentialId,
      });
      return user;
    } catch (err: any) {
      throw err.message;
    }
  }

  async login({
    email,
    password,
    res,
  }: {
    email: string;
    password: string;
    res: Response;
  }): Promise<void> {
    try {
      try {
        const repo = AppDataSource.getRepository(User);
        const user: any = await repo.findOne({
          where: {
            email: email,
          },
        });

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (user) {
          const checkPassword: boolean = await comparePassword(
            user.password,
            password,
          );
          if (checkPassword) {
            if (user?.isEmailVerified === false) {
              throw new Error(
                "Not verified Email please check our email for verification",
              );
            }
            const accessToken: any = await generateToken(user);

            res.json({
              access_token: accessToken,
              message: "Login successful !!",
              status: 200,
            });
          } else {
            res.status(401).json({
              message: "Invalid password !!",
              status: 404,
            });
          }
        } else {
          res.status(401).json({
            message: "No email found or Blocked",
            status: 404,
          });
        }
      } catch (err: any) {
        // res.status(422).send({ error: true, message: err.message });;
      }
    } catch (err: any) {
      res.status(422).send({ error: true, message: err.message, status: 422 });
    }
  }
}
