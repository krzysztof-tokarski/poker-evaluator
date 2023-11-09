# Poker Hand Strength Evaluator

**Wrote it to land a spot for this: https://careers.evolution.com/engineering-scala-bootcamp/

Indeed landed a spot, but in the end too much was happening at the time and I have given up on pursuing the project.  The code here is probably fairly messy (and unfinished), but writing it was fun and challenging, leaving it in my "portfolio" for now as I don't have any other mention worthy public repos to show off ;<
**_

This has taken me a lot more time than expected and unfortunately I should have waited little longer before starting to work on this exercise because this week is unusually busy and I really need to shift my focus towards other stuff at this point and submit the program as is.

So far I've only managed to deliver a working solution for FiveCardDraw and started working towards TexasHoldem.  I believe I had TexasHoldem figured out, at least to the working degree - I meant to iterate through all cards to create all possible sets, then go through each and compare them with the previous one to find the best solution, together with some short circuits to skip some of the logic.  I don't think it would be very hard but the amount of mental workload I'd have to deliver with my current knowledge of writing more complex algorithms is just too much for my current schedule :/

I'm not aware of any defects as of now, although I had some issues with project config I didn't have time to figure out and resorted to removing relative paths support.

I'm pretty sure SOLID/OOP could be improved here, I was split on where to carry out input verification (which wasn't necessary I guess, shouldn't have spent so much time trying to figure this out!).

To run the project install dependecies and run `tsc` to run Typescript compiler, `out` dir will contain executables.

In general I'm rather happy how this has turned out, although wish I had a little more time to work on this than I actually had.
