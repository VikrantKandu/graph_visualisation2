// const neo4j = require('neo4j-driver');
// const connectdb = require('../config/db');

// const driver = connectdb();

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     const session = driver.session();

//     try {
//         const result = await session.run(
//             'MATCH (u:User {email: $email}) RETURN u.password AS password',
//             { email }
//         );

//         if (result.records.length > 0 && result.records[0].get('password') === password) {
//             res.status(200).json({ success: true });
//         } else {
//             res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     } finally {
//         await session.close();
//     }
// };

// module.exports = {
//     login,
// };