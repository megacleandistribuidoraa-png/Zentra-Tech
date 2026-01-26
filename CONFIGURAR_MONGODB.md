# 🔧 Configurar MongoDB - String de Conexão

## ✅ String Encontrada no MongoDB Atlas:

```
mongodb+srv://megacleandistribuidoraa_db_user:<db_password>@cluster0.en8yzsz.mongodb.net/?appName=Cluster0
```

## 📝 O Que Você Precisa Fazer:

### 1. Substituir `<db_password>` pela senha real
- A senha que você criou para o usuário `megacleandistribuidoraa_db_user`
- Se não lembrar, você pode resetar no MongoDB Atlas

### 2. Adicionar o nome do banco
- Adicione `/megaclean` antes do `?`
- Ficará: `...mongodb.net/megaclean?appName=Cluster0`

### 3. String Final Deve Ser:
```
mongodb+srv://megacleandistribuidoraa_db_user:SUA_SENHA_AQUI@cluster0.en8yzsz.mongodb.net/megaclean?appName=Cluster0
```

## 🔐 Se Você Não Lembra a Senha:

1. No MongoDB Atlas, vá em **"Database Access"**
2. Encontre o usuário `megacleandistribuidoraa_db_user`
3. Clique nos 3 pontinhos → **"Edit"** ou **"Reset Password"**
4. Crie uma nova senha e anote

## ✅ Depois de Ter a Senha:

Vou adicionar no arquivo `.env` para você testar localmente!
