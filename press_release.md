[back to project](./README.md)

# Press Release from the Future

## JupyterLab Metadata Explorer Press Release

JupyterLab takes a huge leap forward today with the announcement of the JupyterLab Metadata Explorer. This timely feature will enhance your _data analysis experience_ by bringing you one step closer to the ultimate goal of being empowered by _rich context_ throughout your analyses.

There is valuable contextual information–metadata–surrounding all of JupyterLab entities (notebooks, datasets, file, etc) which we call “rich context”. This _rich context_, if visible, enables the collaborative authoring of an emergent narrative around your work within JupyterLab. It empowers you to collaborate with your peers, discover new information, techniques, and results to help you make informed decisions. It gets to the heart of the underlying value of a dataset for stakeholder agencies and organizations and enables researchers to work with the data in a more effective manner. With the introduction of the JupyterLab Metadata Explorer, we enter a new phase of tooling which will surround the practitioner with _rich context_.

Prior to the Metadata Explorer, JupyterLab _itself_ had no standard way to answer simple questions about _rich context_, such as:

*   Questions about **datasets**:
    *   What is this dataset _about_?
    *   What _questions_ are being answered by it, and in which domains?
    *   Which _research groups_ are using it?
    *   Are there _research publications_ which use this dataset?
    *   What _version_ of this dataset am I using?
    *   Who _curated_ this dataset?
    *   What other _analysis_ use this dataset?
    *   What other _datasets _are being used with this dataset?
*   Questions about **notebooks**:
    *   Who _first created_ this notebook?
    *   Who has _contributed_ to this notebook?
    *   What other notebooks use these same datasets?
    *   Has this notebook been copied or published? If published, does it have a DOI or URL?
*   Questions about **people** (e.g. people listed above as contributors, curators, etc):
    *   What is their name, role, title?
    *   What other topics, publications, projects, datasets, notebooks have they contributed to?

The list of questions above goes on, including questions around topics, domains, organizations, code cells, source code files, documents (PDFs, text files, etc.), publications, research teams, grants, experimental results, etc. An entire _knowledge graph_ of metadata is exposed to the practitioner, built from small bits of metadata which are linked together to form a large network of knowledge. Knowledge is power, and users of JupyterLab will benefit tremendously from the Metadata Explorer inside JupyterLab.

The Metadata Explorer is part of a larger rollout named the _JupyterLab Metadata Service_, consisting of three components:

1. **Metadata Explorer:** A user interface for exploring metadata knowledge graph.
2. **Metadata Catalogs:** Collections of curated metadata (may exist in various formats).
3. **Metadata Providers:** JupyterLab extensions linking _catalogs_ into the _explorer_.

_Metadata Catalogs_ already exist in various formats, are hosted in various ways by various organizations, and have many uses outside of JupyterLab. The _Metadata Service_ will not attempt to re-invent these catalogs; rather, it merely uses the _Metadata Providers_ and _Metadata Explorer_ to expose those catalogs through the JupyterLab interface to the end-users. The result is that the _Metadata Explorer_ can merge many catalogs together into a unified view!

Existing organizations can begin serving their metadata catalogs through JupyterLab by supplying a custom Metadata Provider extension to JupyterLab for their members to use. This offers several benefits:

1. End users benefit from having relevant metadata served _within_ JupyterLab.
2. Security and access control is maintained. JupyterLab queries existing, well-tested systems. (It’s possible to configure these controls to give tiered access to individuals, or members of a project).
3. Metadata will not be copied into a new system, thus there are no added maintenance costs.

The _Metadata Service_ comes with one built-in _Metadata Provider_ backed by GraphQL. It exposes a schema modeled after [schema.org](https://schema.org/).

Taken together, the result is a flexible system which serves both organizations and end-users. Organizations with existing metadata catalogs can serve their catalogs to their JupyterLab users (by writing or configuring a JupyterLab Metadata Provider). End-users can hand curate metadata on their own project files using the built-in Metadata Provider (GraphQL) or access other Metadata Providers (either supplied by their organization or by the greater JupyterLab community).

The _JupyterLab Metadata Explorer_ is a step forward into the world of _rich context_, which is a long-term goal of the JupyterLab core team. Go download and install the _JupyterLab Metadata Explorer_ today. Your metadata awaits you!
