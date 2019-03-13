/*
Reguli:

- jocul are 2 jucatori, se joaca pe runde
- In fiecare tura jucatorul poate roti zarul de cate ori doreste, iar apasand butonul "HOLD" se concateneaza la scorul global,urmand celalalt jucator.Dar daca jucatorul intoarce zarul cu fata "1" automat se pierde tot scorul actual acumulat, prin urmare urmeaza tura adversarului.
- se seteaza un scor in prima casuta din partea de sus a paginii, iar daca nu, jocul se continua pana cand primul care atinge scorul 100.

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;
function linkedList(){
	this.head=null;
}
linkedList.prototype.push=function(val)
{
var node = {
value: val,
next: null,
}
if (!this.head)
{
this.head=node;
}
else
{
current=this.head
while (current.next)
{
current=current.next;
}
current.next=node;
}
}


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. se genereaza un numar inclus intre 1 si 6
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. se afiseaza rezultatul
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
       
        //3. aici se creaza concatenarea in scorul actual in cazul in care nu s-a afisat zarul cu numarul 1
       
        if (dice !== 1) {
            //adaug scorul
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //urmatorul player
            nextPlayer();
        }
        
        
    }    
});

let ll=new linkedList();
let stack=[];
var vect=[],i=0,p=0,w=[];
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // adaug scorul actual la scorul global
        scores[activePlayer] += roundScore;
       let ll=new linkedList();
        if (activePlayer==0){
        vect[i]=roundScore;
        i++;
        }
        if (activePlayer==1){
            w[p]=roundScore;
            p++;
        }
        stack.push(roundScore);
        console.log(stack.pop());
        // updatam interfata
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        
        //tot ce e 0 / null / " " e considerat fals
        //orice alta valoare e considerata adevarat
        if (input)            {
                var winningScore= input;
            }else{
             winningScore=100;   
            }
        
        
        // verificam daca unul dintre playeri a atins scorul final
        if (scores[activePlayer] == winningScore || scores[activePlayer]%winningScore==0 && scores[activePlayer]!=0) {
            var j=0,m=0,q=0,l,k,pp=0,tt=-4,o,qq=0,oo=-2;
            console.log("Valorile primului jucator");
            for (j=0;j<i;j++)
            {   if (vect[j]>m)
                    m=vect[j];
                console.log(vect[j]);
                ll.push(vect[j]);
            }
            console.log("Valorile celui de al doilea jucator");
            for (j=0;j<p;j++)
                {
                    if (w[j]>q)
                        q=w[j];
                    console.log(w[j]);
                    ll.push(w[j]);
                }
            for (l=0;l<i;l++)
                {
                    k=0;
                    for (j=l+1;j<i;j++)
                       { if (vect[l]==vect[j])
                            k+=1;
                       }
                    if (k>pp)   
                        {
                            pp=k;
                            tt=l;
                        }
                }
            for (l=0;l<p;l++)
                {
                    o=0;
                    for (j=l+1;j<p;j++){
                          if (w[l]==w[j])
                             o+=1;
                       }
                    if (o>qq)
                        {
                            qq=o;
                            oo=l;
                        }
                }
            if (tt>=0 && tt<i){
            console.log("Aceasta este valoarea cu numarul de aparitii cel mai mare a primului jucator=",vect[tt]);
            }
            else{
                console.log("Aceasta este valoarea cu numarul de aparitii cel mai mare a primului jucator=",vect[1]);
            }
            if (oo>=0 && oo<p)
                {
            console.log("Aceasta este valoarea cu numarul de aparitii cel mai mare a celui de al doilea jucator=",w[oo]);
                }
            else
                {
                    console.log("Aceasta este valoarea cu numarul de aparitii cel mai mare a celui de al doilea jucator=",w[1]);
                }
            console.log("Aceasta este cea mai mare valoare retinuta a primului jucator=",m);
            console.log("Aceasta este cea mai mare valoare retinuta a celui de al doilea jucator=",q);
            
            console.log("Aceasta este lista simplu inlantuita",ll.head);	
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            while (scores[activePlayer]>winningScore)
                {
                    scores[activePlayer]-=winningScore;
                }
            
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //urm player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;








