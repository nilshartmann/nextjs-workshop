// type User = {
// 	firstname: string;
// 	// email: string;
// 	age?: number;
// }
//
// const TUser = z.object({
//   firstname: z.string().max(10),
//   email: z.string().email(),
//   age: z.number().optional(),
// });
// type IUser = z.infer<typeof TUser>;
//
// declare function myFetch(): unknown;
// const result = myFetch();
//
// const validatedResult = TUser.parse(result);
// displayUser(validatedResult);
//
// declare function displayUser(u: IUser): void;
//
// displayUser(user);
