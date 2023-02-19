from flask import Flask
from flask_cors import CORS
from gensim import models
import gensim.downloader
from gensim.models.word2vec import Word2Vec
from gensim.models.keyedvectors import KeyedVectors

import numpy as np

import json
import argparse
import logging

from multiprocessing import cpu_count

import sys
import os
import re
import math

# import fs;
# import readline;
import pandas as pd

outputFile = None
MODEL = gensim.downloader.load("glove-wiki-gigaword-50")
WORDS = ["cat", "dog", "pet", "food", "animal", "building", "city", "run", "architect", "designer"]

# def output(data, jsonify:bool = False):
#     if outputFile is None:
#         for d in data: print(f"$D:{d}")
#         print(f"$END")
#     elif jsonify:
#         with open(outputFile, "w") as outfile:
#             json.dump(data, outfile)
#     else:
#         with open(outputFile, "w") as outfile:
#                 for d in data:
#                     outfile.write(d)
#                     outfile.write("\n")

# convert the vector component strings
def walkVectorComponents(dataLines):
    v = []
    for d in dataLines:
        components = list(d.split(",")) 
        for i, vec in enumerate(components):
            try:
                components[i] = float(vec)
            except:
                components[i] = vec
        v.append(components)
    return v


def calculateSimularity(vecA, vecB):
    sum = 0
    normA = 0
    normB = 0
    for i, v in enumerate(vecA):
        sum += vecA[i] * vecB[i]
        normA += vecA[i] * vecA[i]
        normB += vecB[i] * vecB[i]
    normA = math.sqrt(normA)
    normB = math.sqrt(normB)
    return sum / (normA * normB)

def calculateSimularityMatrix(vecs):
    sims = []
    # look at each vector in the list of vectors
    for v1 in vecs:
        # select only the numerical components
        v1 = v1[1:]
        sim = []
        for v2 in vecs:
            v2 = v2[1:]
            sim.append(calculateSimularity(v1, v2))
        sims.append(sim)
    return sims

def getVectors(words):
    wordMap = MODEL
    datalines = []
    for w in words:
        vec = wordMap[w]
        s = w
        for i in vec:
            s += f",{i}"

        datalines.append(s)
    return datalines

# create instance of Flask
app = Flask(__name__)
CORS(app)

# Execute the function when someone accesses the root index
@app.route("/test")
def home():
    return "<p>Hello, World</p>"

@app.route("/testGetVectors")
def getV():
    vs = getVectors(WORDS)
    return f"<p>{vs}</p>"

@app.route("/testCalculateSimularityMatrix")
def getS():
    vs = getVectors(WORDS)
    # get list of vectors
    vs = walkVectorComponents(vs)
    # sims = []
    # # look at each vector in the list of vectors
    # for v1 in vs:
    #     # select only the numerical components
    #     v1 = v1[1:]
    #     sim = []
    #     for v2 in vs:
    #         v2 = v2[1:]
    #         sim.append(calculateSimularityMatrix(v1, v2))
    #     sims.append(sim)
    sims = calculateSimularityMatrix(vs)
    return f"<p>{sims}</p>"

@app.route("/testFetch")
def getFetch():
    # df = pd.read_csv("data/words_vectored.csv")
    # vecs = df.vectored.values
    # sims = calculateSimularityMatrix(vecs)
    mat = np.loadtxt("data/simularityMatrix400.gz")
    return json.dumps(mat.tolist())

# If the script that was run is this script (we have not been imported)
if __name__ == "__main__": 
    app.run(debug=True, ssl_context="adhoc", port=3001)