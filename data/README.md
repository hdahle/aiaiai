# Openai command line tools
These require Python3 and Pip
````
pip install openai pandas
````
## Create JSONL data from CSV
Answer YES to all qustions when starting this script
````
openai tools fine_tunes.prepare_data -f huma.real.csv
````
## Fine tune the JSONL data
````
openai api fine_tunes.create --n_epochs 10 -t "huma.real_prepared.jsonl" -m davinci
````
Default value for ```n_epochs``` is 4. A higher number normally yields better results but is more time consuming and costly