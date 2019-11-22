#!/usr/bin/env bash

_commit="a39043c7"
_args="-p 8081:8081"

docker run -d \
	--name="llogger_feature_${_commit}" \
	--label="ghcd=${_commit}" \
	 llogger:stage
#2019-11-19-01-00-12
