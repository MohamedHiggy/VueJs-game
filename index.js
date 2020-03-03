new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        //startGame
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        //attach
        attach: function () {
            var damage = this.calculateDamage(3, 10); 
            this.monsterHealth -= damage;
            this.turns.unshift ({isPlayer: true, text: 'player hits monster form ' + damage});
            if (this.checkWin()){return;}
            this.monsterAttacks(); 
        },

        //specialAttach
        specialAttach: function () { 
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift ({isPlayer: true,text: 'player hits monster hard form ' + damage});
            if (this.checkWin()){return;}
            this.monsterAttacks(); 
        },
        
        //heal
        heal: function () { 
            if (this.playerHealth <= 90) 
            {
                this.playerHealth += 10;
            } 
            else 
            {
                this.playerHealth = 100;
            }
            this.turns.unshift ({isPlayer: true, text: 'player heals for 10'});
            this.monsterAttacks();
        },
 
        //giveUp
        giveUp: function () { 
            this.gameIsRunning = false;
        },

        //monsterAttacks
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12); 
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift ({ isPlayer: false,text: 'monster hits player form ' + damage});
        },

        //calculateDamage
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },

        //checkWin
        checkWin: function () {
            if (this.monsterHealth <= 0) 
            {
                if (confirm("you won! new game?")) 
                {
                    this.startGame();
                } 
                else 
                {
                    this.gameIsRunning = false;
                }
                return true;
            } 
            else if (this.playerHealth <= 0) 
            {
                if (confirm("you lose! new game?")) 
                {
                    this.startGame();
                } 
                else 
                {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});
