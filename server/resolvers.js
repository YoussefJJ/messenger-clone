import pc from '@prisma/client'
import {AuthenticationError, ForbiddenError} from 'apollo-server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new pc.PrismaClient()

const resolvers = {
    Query: {
        users: async (_, args, {userId}) => {
            console.log(userId)
            if (!userId) {
                throw new ForbiddenError("You must be logged in.")
            }
            const users = await prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                id: {
                    not: userId
                }
            }}) 
            return users
        },
        messagesByUser: async (_, {receiverId}, {userId}) => {
            if (!userId) {
                throw new ForbiddenError("You must be logged in.")
            }
            const messages = await prisma.message.findMany({
                where: {
                    OR: [
                        {senderId: userId, receiverId: receiverId},
                        {senderId: receiverId, receiverId: userId}
                    ]
                },
                orderBy: {
                    createdAt: "asc"
                }
            })
            return messages 
        }
    },
    
    Mutation: {
        signupUser: async (_, {userNew}) => {
            const user = await prisma.user.findUnique({where: {email:userNew.email}})
            if (user) {
                throw new AuthenticationError("User with that e-mail already exists.")
            }
            const hashedpassword = await bcrypt.hash(userNew.password, 10)
            const newUser = await prisma.user.create({
                data:{
                    ...userNew,
                    password: hashedpassword
                }
            })
            return newUser
        },
        signinUser: async (_, {userLogin}) => {
            const user = await prisma.user.findUnique({where: {email:userLogin.email}})
            if (!user) {
                throw new AuthenticationError("User with that e-mail doesn't exist.")
            }
            const doMatch = await bcrypt.compare(userLogin.password, user.password)
            if (!doMatch) {
                throw new AuthenticationError("E-mail or password is invalid.")
            }
            const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
            return {token}
        },
        createMessage: async(_, {receiverId, text}, {userId}) => {
            if (!userId) {
                throw new ForbiddenError("You must be logged in.")
            }
            const message = await prisma.message.create({
                data: {
                    text,
                    receiverId,
                    senderId: userId
                }
            })
            return message
        }
    }
}

export default resolvers