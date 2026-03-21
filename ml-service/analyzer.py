from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def match_score(resume_text , job_description):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text,job_description])

    similarity = cosine_similarity(vectors[0],vectors[1])
 

    return round(float(similarity[0][0]) * 100, 2)

def get_keywords(text, top_n=20):
    vectorizer = TfidfVectorizer(stop_words='english')
    vectorizer.fit_transform([text])
    scores = zip(vectorizer.get_feature_names_out(), 
                 vectorizer.idf_)
    sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
    return [word for word, score in sorted_scores[:top_n]]

def get_matched_skills(resume_text, jd_text):
    resume_keywords = set(get_keywords(resume_text))
    jd_keywords = set(get_keywords(jd_text))
    matched = resume_keywords.intersection(jd_keywords)
    missing = jd_keywords - resume_keywords
    return list(matched), list(missing)


