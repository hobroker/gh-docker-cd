#!/usr/bin/env bash

_commit="a39043c1"
_args="-p 8081:8081"

docker run -d \
	--name="llogger_feature__${_commit}" \
	--label "ghcd=llogger-feature-${_commit}" \
	--rm \
	 llogger:stage
#2019-11-19-01-00-12
