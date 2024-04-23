const player1 = {
    NOME: "Mário",
    VELOCIDADE: 4,
    MANOBRALIDADE: 3,
    PODER: 3,
    PONTOS: 0
}
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRALIDADE: 4,
    PODER: 4,
    PONTOS: 0
}

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}
async function rollPower(){
    return Math.floor(Math.random() * 2);
}

async function getRandomBlock(){
    let random = Math.random();
    let result;
    switch(true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO"
    }
    return result;
}

async function logRollResult(characterName,block,diceResult,attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(char1,char2){
    for(let round = 1;round <= 5;round++){
        console.log(`🏁 Rodada ${round}`)
        // Sortear bloco
        let block = await getRandomBlock();
        console.log(`${block}`)

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;
        

        if(block == "RETA"){
            totalTestSkill1 = diceResult1 + char1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + char2.VELOCIDADE;

            await logRollResult(char1.NOME,"velocidade",diceResult1,char1.VELOCIDADE)
            await logRollResult(char2.NOME,"velocidade",diceResult2,char1.VELOCIDADE)
            
        }
        else if(block == "CURVA"){
            totalTestSkill1 = diceResult1 + char1.MANOBRALIDADE;
            totalTestSkill2 = diceResult2 + char2.MANOBRALIDADE;

            await logRollResult(char1.NOME,"manobralidade",diceResult1,char1.MANOBRALIDADE);
            await logRollResult(char2.NOME,"manobralidade",diceResult2,char1.MANOBRALIDADE);
        }
        else if(block == "CONFRONTO"){
            let SkillPower1 = await rollPower();
            let SkillPower2 = await rollPower();
            totalTestSkill1 = diceResult1 + char1.PODER;
            totalTestSkill2 = diceResult2 + char2.PODER;
            console.log(`${char1.NOME} confrontou com ${char2.NOME}! 🥊`);
            await logRollResult(char1.NOME,"poder",diceResult1,char1.PODER);
            await logRollResult(char2.NOME,"poder",diceResult2,char1.PODER);
            if(totalTestSkill1 > totalTestSkill2 && char2.PONTOS > 0 ){
                console.log(`${char1.NOME} venceu o confronto! ${char2.NOME} perdeu 1 ponto 🐢`);
                char2.PONTOS--;
            }
            if(totalTestSkill2 > totalTestSkill1 && char1.PONTOS > 0 ){
                console.log(`${char2.NOME} venceu o confronto! ${char1.NOME} perdeu 1 ponto 🐢`);
                char1.PONTOS--;
            }
            if(char1.PONTOS > 0){
                char1.PONTOS -= SkillPower1;
                if(SkillPower1 == 1){
                    console.log(`${char1.NOME} foi atingido por um casco ! Perdeu 1 ponto`);
                }else{
                    console.log(`${char1.NOME} foi atingido por uma bomba ! Perdeu 2 pontos`);
                }
            }else if(char2.PONTOS > 0){
                char2.PONTOS -= SkillPower2;
                if(SkillPower2 == 1){
                    console.log(`${char1.NOME} foi atingido por um casco ! Perdeu 1 ponto`);
                }else{
                    console.log(`${char1.NOME} foi atingido por uma bomba ! Perdeu 2 pontos`);
                }
            }
            console.log(totalTestSkill1 == totalTestSkill2 ? "Confronto empatado! Nenhum ponto foi perdido!" : "");
        }
        
        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${char1.NOME} marcou um ponto!`);
            char1.PONTOS++;
        }else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${char2.NOME} marcou um ponto!`);
            char2.PONTOS++;
        }
        console.log("----------------------------")
    }
}

async function declareWinner(char1,char2){
    console.log("Resultado Final: ");
    console.log(`${char1.NOME}: ${char1.PONTOS} ponto(s)`);
    console.log(`${char2.NOME}: ${char2.PONTOS} ponto(s)`);
    if(char1.PONTOS > char2.PONTOS){
        console.log(`\n${char1.NOME} venceu a corrida ! Parabéns 🏆`);
    }else if(char2.PONTOS > char1.PONTOS){
        console.log(`\n${char2.NOME} venceu a corrida ! Parabéns 🏆`);
    }else{
        console.log("A corrida terminou em empate!");
    }
}
(async function main(){
    console.log(
        `🚨🏁 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );
    await playRaceEngine(player1,player2);
    await declareWinner(player1,player2);
})();