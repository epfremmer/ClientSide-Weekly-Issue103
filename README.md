# Prisoner's Dilemma

## Requirements

* node version >= 0.10

## Installation

* npm install
* npm run build

## Usage

    Prisoner's Dilemma
    
    path: bin/dilemma

    usage: dilemma [-h] [-v] 
                   partnerName partnerDiscipline {client-side,jvm,mobile,.net,php,ruby} 
                   [partnerPreviousResponse {silent,confess}] 
                   [playerPreviousResponse {silent,confess}]
                
    Positional arguments:
       partnerName           This is the name of the opponent or the player who
                             was your partner in crime.
       {client-side,jvm,mobile,.net,php,ruby}
                             This is the discipline of your opponent. It will be
                             one of the following: [client-side, jvm, mobile, .net,
                              php, ruby]
       {silent,confess}      This is the response of your opponent from your
                             previous match with that opponent. Is one of
                             “confess” or “silent”. This will not be provided in
                             your first match with this opponent.
       {silent,confess}      This is your response from the previous match with
                             this opponent. Is one of “confess” or “silent”. This
                             will not be provided in your first match with this
                             opponent.
                             
    Optional arguments:
       -h, --help            Show this help message and exit.
       -v, --version         Show program's version number and exit.

## Testing

* npm test
