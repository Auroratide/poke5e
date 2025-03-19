import{s as B,d as r,i as m,c as v,a as g,n as D,b as p,g as f,e as d}from"../chunks/CUP6ykR2.js";import{S as q,i as E,d as T,t as S,a as $,m as A,c as C,b as _}from"../chunks/BnQR6DiB.js";import{C as H}from"../chunks/Qmjpi3jo.js";import{T as x}from"../chunks/CH09LznU.js";function I(w){let o,u="<p>Being a master of your Pokémon in battle is one of the most important parts of this game. Pokémon have their own set of moves, stats, and levels to gain.</p> <p>Combat rules are the same as in D&amp;D 5e, with the following extensions:</p> <ul><li>At the start of a battle, you make one initiative roll for each of your Pokémon in battle, using your Pokémon&#39;s initiative bonus. Your trainer&#39;s turn happens concurrently with their first Pokémon in the initiative order.</li> <li>A trainer&#39;s turn is spent either issuing commands to their Pokémon, using items, or interacting with the environment. As an action, a trainer may issue up to two commands, and only a single command per Pokémon.</li> <li>A trainer may also use their bonus action to issue up to two commands for moves with a Move Time of 1 Bonus Action, one bonus move per Pokémon.</li> <li>If a trainer has three or more Pokémon out, they may only issue commands to two of them, and the other Pokémon may only use their turns to move.</li> <li>On your turn, both your trainer and your active Pokémon have movement up to their speed.</li> <li>Both you and your Pokémon have one reaction you can use per round of battle.</li></ul>",n,a,e='<h2>Moves/Move Power</h2> <p>Moves in Pokémon 5e work similarly to spells in 5e D&amp;D. Instead of a single character having a set amount of spell slots, each move has a set amount of <dfn>Power Points</dfn> (<abbr>PP</abbr>). PP determines how many times the move can be used, one use per one PP. Refilling PP can be done by long resting or using an item such as Ether.</p> <p>Most moves have a <dfn>Move Power</dfn> - the focused ability of that move. Move Powers can be any of the six main ability scores, and determine which ability to use for attack, damage, and saving throw DC. If a move specifies multiple move powers, you choose one of the move powers for calculations.</p> <div class="center smaller svelte-fqywa2"><p><code><strong>Attack Roll Bonus</strong> = Move Power Mod + Prof. Mod</code></p> <p><code><strong>Damage Bonus</strong> = Move Power Mod + STAB</code></p> <p><code><strong>Saving Throw DC</strong> = 8 + Move Power Mod + Prof. Mod</code></p></div> <p>Pokémon are proficient in all the moves they know.</p> <h3>STAB</h3> <p><abbr>STAB</abbr> stands for &quot;Same-Type Attack Bonus&quot;. When a Pokémon uses a move with the same type as one of its own types, it gets a STAB bonus added to damage rolls. Otherwise, STAB is 0.</p> <p>When STAB applies, it is equal to the Move Power Mod of the move. This effectively doubles the Move Power Mod of moves that are the same type as the Pokémon using it.</p> <h3>The Struggle Move</h3> <p>When a Pokémon runs out of PP on all of the moves it knows, the only action it may take is <strong><a href="/moves/struggle">Struggle</a></strong>. Struggle can be used at any time, regardless of PP remaining in other moves.</p> <h3>Example</h3> <p>You command your level 14 <a href="/pokemon/vivillon">Vivillon</a> to use the move <a href="/moves/bug-buzz">Bug Buzz</a>.</p> <p>Bug Buzz uses either DEX or CHA as its move power. Our Vivillon&#39;s DEX of 17 is higher than it&#39;s CHA of 10, so we will use DEX. Therefore, we calculate:</p> <ul class="smaller svelte-fqywa2"><li><strong>Save DC = 16</strong>: 8 + 3 (DEX mod) + 5 (proficiency)</li> <li><strong>Damage</strong>: 3d10 (level) + 3 (DEX mod) + 3 (STAB)</li></ul> <p>Vivillon&#39;s STAB is 3 since Bug Buzz is a bug-type move, and Vivillon is a bug-type Pokémon.</p>',i,s,k="<h2>Switching Pokémon</h2> <p>A Trainer may take the &quot;switch&quot; action to recall one of their Pokémon within line of sight from up to 60 feet away and realease a new Pokémon within line of sight up to 60 feet away. Changing out a Pokémon before it has fainted takes up an entire action, but changing out a Pokémon when it faints can be done immediately and out of turn as a reaction.</p> <p>When a Pokémon is switched in, it has to take a moment to stablize itself after its recent reformation from pure energy. A Pokémon that has been switched cannot move nor take any actions, reactions, or bonus actions during the current turn.</p> <p>Switching out a Pokémon does not provoke an attack of oppurtunity on either the trainer or the Pokémon.</p>",P,h,b="<h2>Attacks of Opportunity</h2> <p>If a Pokémon leaves the melee range of another creature without using the Disengage action, or when not returning to a Pokéball, the opponent may use a melee move that has a move time of 1 action immediately as a reaction targeting the fleeing Pokémon. The move costs the normal amount of PP.</p>",y,c,M="<h2>Readying an Action</h2> <p>A Pokémon can choose to use the action on their turn to &quot;ready&quot; one of their Moves to use as a reaction that triggers after a set of circumstances determined by the player.</p> <p>In order to ready a Move, the Move must be selected and PP reduced. Readying a Move and waiting for the perfect moment to activate it requires concentration. If concentration breaks before the trigger, the Move cannot be used and the PP is lost.</p>";return{c(){o=d("section"),o.innerHTML=u,n=g(),a=d("section"),a.innerHTML=e,i=g(),s=d("section"),s.innerHTML=k,P=g(),h=d("section"),h.innerHTML=b,y=g(),c=d("section"),c.innerHTML=M},l(t){o=p(t,"SECTION",{"data-svelte-h":!0}),f(o)!=="svelte-118pock"&&(o.innerHTML=u),n=v(t),a=p(t,"SECTION",{"data-svelte-h":!0}),f(a)!=="svelte-96mp2f"&&(a.innerHTML=e),i=v(t),s=p(t,"SECTION",{"data-svelte-h":!0}),f(s)!=="svelte-sd2ojo"&&(s.innerHTML=k),P=v(t),h=p(t,"SECTION",{"data-svelte-h":!0}),f(h)!=="svelte-1q1d4s4"&&(h.innerHTML=b),y=v(t),c=p(t,"SECTION",{"data-svelte-h":!0}),f(c)!=="svelte-r41mad"&&(c.innerHTML=M)},m(t,l){m(t,o,l),m(t,n,l),m(t,a,l),m(t,i,l),m(t,s,l),m(t,P,l),m(t,h,l),m(t,y,l),m(t,c,l)},p:D,d(t){t&&(r(o),r(n),r(a),r(i),r(s),r(P),r(h),r(y),r(c))}}}function L(w){let o,u,n,a;return o=new x({props:{value:"Combat"}}),n=new H({props:{title:"Combat",$$slots:{default:[I]},$$scope:{ctx:w}}}),{c(){_(o.$$.fragment),u=g(),_(n.$$.fragment)},l(e){C(o.$$.fragment,e),u=v(e),C(n.$$.fragment,e)},m(e,i){A(o,e,i),m(e,u,i),A(n,e,i),a=!0},p(e,[i]){const s={};i&1&&(s.$$scope={dirty:i,ctx:e}),n.$set(s)},i(e){a||($(o.$$.fragment,e),$(n.$$.fragment,e),a=!0)},o(e){S(o.$$.fragment,e),S(n.$$.fragment,e),a=!1},d(e){e&&r(u),T(o,e),T(n,e)}}}class R extends q{constructor(o){super(),E(this,o,null,L,B,{})}}export{R as component};
