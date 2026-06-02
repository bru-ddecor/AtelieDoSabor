const { GoogleGenerativeAI } = require("@google/generative-ai");

const iniciarChat = async (req, res) => {
    try {

        console.log("ENTROU NO CHAT");

    const CHAVE_API = "AIzaSyCFMrn1szUwALt0TZiZgYDkGSLv4WXFBzM";

    console.log("CHAVE:", CHAVE_API);
        const mensagem = req.body.mensagem;
        const historico = req.body.historico || [];

        const genAI = new GoogleGenerativeAI(CHAVE_API);

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: `
Você é um atendente de delivery de um restaurante de comidas caseiras.

Seja breve, educado e prestativo.

Cardápio:

Bife acebolado — R$24,90
Frango grelhado — R$22,90
Linguiça acebolada — R$23,90

Legumes salteados — R$19,90
Abobrinha recheada — R$21,90
Omelete de legumes — R$20,90
Escondidinho de mandioca — R$22,90

Arroz — R$3,00
Feijão — R$3,50
Salada — R$4,00
Batata — R$5,00
Farofa — R$3,00
Macarrão alho e óleo — R$5,50
Couve refogada — R$4,50

Gelatina colorida — R$3,90
Bolo de cenoura — R$5,90
Arroz doce — R$6,90
Mousse de chocolate — R$7,90
Pudim de leite — R$8,90

Refrigerantes (Coca, Fanta e Pepsi) — R$6,00
`
        });

        const chat = model.startChat({
            history: historico
        });

        const resultado = await chat.sendMessage(mensagem);

        const resposta = resultado.response.text();

        res.status(200).json({
            resposta,
            novoHistorico: [
                ...historico,
                {
                    role: "user",
                    parts: [{ text: mensagem }]
                },
                {
                    role: "model",
                    parts: [{ text: resposta }]
                }
            ]
        });

    } catch (erro) {

        console.error("Erro:", erro);

        res.status(500).json({
            erro: "Erro ao processar a mensagem",
            message: erro.message
        });

    }
};

module.exports = { iniciarChat };
