const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function registrar(req, res) {
    const user = new User(req.body);
    user.password = await bcrypt.hashSync(user.password, 8);
    await user.save()
        .then(doc => {
            doc.password = undefined;
            return res.status(201).json(doc);
        })
        .catch(error => {
            const msg = {};
            Object.values(error.errors).forEach(({properties}) => {
                msg[properties.path] = properties.message;
            });
            if (error.code == 11000) {
                msg["erro"] = "Email já registrado";
            }
            return res.status(422).json(msg);
        });
}

async function login(req, res) {
    const { email, password } = req.body;
    await User.findOne({email: email}).select("+password")
    .then(async doc => {
        if (!doc) {
            return res.status(404).json({ erro: 'Usuário não cadastrado!' });
        }
        const autentica = await bcrypt.compareSync(password, doc.password);
        if (!autentica) {
            return res.status(400).json({ erro: "Senha inválida" })
        }
        return res.status(200).json({ msg: "Usuário logado"});
    })
    .catch(error => {
        return res.status(500).json(error);
    });
}

module.exports = { registrar, login }