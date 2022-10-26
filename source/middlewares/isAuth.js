// // import AccountModel from '../models/Account'
// // import { verify } from 'jsonwebtoken'

// const isAuth = async (req, res, next) => {
//     // const token = req.body.token || req.query.token
//     // if (!token){
//     //     return res.status(403).json({
//     //         message: "No token provided",
//     //     })
//     // }
//     // try {
//     //     //const decoded = verify(token, process.env.TOKEN_SECRET)
//     //     const us = await AccountModel.findOne({username: decoded.data.username})
//     //     req.user = us
//     //     return next()
//     // } catch (error) {
//     //     return res.status(401).json({
//     //         message: error.message
//     //     })
//     // }
// }

// export default isAuth