to_replace = [i for i in range(0,10)]
replace_with = ['à', '&', 'é', '"', "'", '(', '-', 'è', '_', 'ç']
def replace_phrase(phrase):
    if 'é' in phrase:
        phrase = phrase.lower()
        for i in to_replace:
            phrase = phrase.replace(str(replace_with[i]), str(to_replace[i]))
        return phrase
    else:
        phrase = phrase.upper()
        for i in to_replace:
            phrase = phrase.replace(str(to_replace[i]), replace_with[i])
        return phrase