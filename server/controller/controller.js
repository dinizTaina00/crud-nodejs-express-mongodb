var Userdb = require('../model/model');

//criar e salvar novo usuario
exports.create = (req,res)=>{
    //validar request
    if(!req.body){
        res.status(400).send({message: "Não pode ser vazio"});
        return;
    }

    //novo usuario
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender: req.body.gender
    })

    //salva
    user.save(user).then(data=>{
        // res.send(data)
        res.redirect('/');
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Algum erro ocorreu"
        })
    })
}

//retorna todos os usuarios / ou um usuario especifico
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id).then(data=>{
            if(!data){
                res.status(404).send({message:"Não foi encontrado usuario com esse id"})
            }else{
                res.send(data)
            }
        }).catch(err=>{
            res.status(500).send({message:"Erro ao tentar recuperar os dados"})
        })
    }else{
        Userdb.find().then(user=>{
            res.send(user);
        }).catch(err=>{
            res.status(500).send({message:err.message || "Erro ocorrido ao recuperar do banco"})
        })
    }
}

//atualizar um usuario 
exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message: "Dados não podem estar vazios"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false}).then(data=>{
        if(!data){
            res.status(404).send({message: "Não pode ser atualizado"});
        }else{
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({message: "Erro"})
    })
}

//deletar um usuario
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).send({message: "Não pode ser deletado sem especificar um ID"})
        }else{
            res.send({message:"usuario foi deletado"})
        }
    }).catch(err=>{
        res.status(500).send({
            message:"Usuário não pode ser deletado"
        })
    })
}