## Selected Stock Price Features and Their Formulas

Definition:
* C is the closing price
* L is the low price
* H is the high price
* MA is the moving average of price M = (H + L + C) / 3
* SM is summation MA, SM = sum(MA) / length(MA)

## Stochastic Oscillator
Stochastic Oscillator is a momentum indicator that shows the location of the close relative to the high-low range over a set number of periods.

%K = (Current Close - Lowest Low)/(Highest High - Lowest Low) * 100
%D = 3-day SMA(simple moving average) of %K

Lowest Low = lowest low for the look-back period
Highest High = highest high for the look-back period
%K is multiplied by 100 to move the decimal point two places

Fast %K = %K basic calculation
Fast %D = 3-period SMA of Fast %K
Slow %K = Fast %K smoothed with 3-period SMA
Slow %D = 3-period SMA of Slow %K
