# Copyright (C) 2023 Assistance.Chat contributors

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#     http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


from collections import defaultdict
from assistance._paths import CAMPAIGN_DATA


def get_progression_stats():
    progression_record = (CAMPAIGN_DATA / "jims-ac" / "progression").glob("*/*")
    progression_timing_data = defaultdict(dict)

    for record in progression_record:
        with open(record) as f:
            time = f.read()

        if time == "":
            time = record.stat().st_mtime
        else:
            time = float(time)

        progression_timing_data[record.parent.name.lower()][record.name] = time

    return progression_timing_data