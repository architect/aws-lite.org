cd scripts

if [ ! -d "aws-lite" ]; then
  echo 'aws-lite not found, cloning repo to generate doc data'
  git clone https://github.com/aws-lite/aws-lite.git
else
  echo 'Pulling latest aws-lite changes'
  cd aws-lite
  git pull
  cd ..
fi

node generate-plugin-data.mjs
node get-latest-perf-data.mjs
