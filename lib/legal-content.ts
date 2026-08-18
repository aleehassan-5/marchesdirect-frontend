export type LegalKey = "mentions" | "confidentialite" | "cgu" | "contact";

export const legalContent: Record<LegalKey, { title: { fr: string; en: string }; body: { fr: string[]; en: string[] } }> = {
  mentions: {
    title: { fr: "Mentions legales", en: "Legal notice" },
    body: {
      fr: [
        "MarchesDirect est un service edite dans le cadre du developpement de la plateforme decrite dans le cahier des charges technique v1.2.",
        "Editeur, hebergeur et coordonnees complets seront publies ici avant l'ouverture au public, une fois le nom de domaine et l'hebergement enregistres au nom du client.",
      ],
      en: [
        "MarchesDirect is a service published as part of the platform described in the Technical Requirements v1.2.",
        "Full publisher, host and contact details will be published here before public launch, once the domain and hosting are registered under the client's name.",
      ],
    },
  },
  confidentialite: {
    title: { fr: "Confidentialite", en: "Privacy" },
    body: {
      fr: [
        "Les donnees personnelles sont hebergees en Europe et traitees conformement au RGPD.",
        "Chaque compte peut demander l'acces, la rectification ou la suppression de ses donnees. La politique complete sera publiee avant l'ouverture au public.",
      ],
      en: [
        "Personal data is hosted in Europe and processed in accordance with GDPR.",
        "Every account can request access, correction or deletion of its data. The full policy will be published before public launch.",
      ],
    },
  },
  cgu: {
    title: { fr: "Conditions generales d'utilisation", en: "Terms of use" },
    body: {
      fr: [
        "Les CGU completes, incluant les conditions d'abonnement, de resiliation et d'usage du module de reponse aux appels d'offres, seront publiees avant l'ouverture au public.",
      ],
      en: [
        "Full terms of use, including subscription, cancellation and tender-response module conditions, will be published before public launch.",
      ],
    },
  },
  contact: {
    title: { fr: "Contact", en: "Contact" },
    body: {
      fr: [
        "Une question sur une opportunite, votre abonnement ou votre profil entreprise ?",
        "Le formulaire de contact et les coordonnees du service commercial seront actives avec l'integration CRM (voir section 9 du cahier des charges).",
      ],
      en: [
        "A question about an opportunity, your subscription or your company profile?",
        "The contact form and sales contact details will go live with the CRM integration (see section 9 of the requirements).",
      ],
    },
  },
};
