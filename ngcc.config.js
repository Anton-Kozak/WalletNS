// // module.exports = {
// //   packages: {
// //     "@nativescript/angular": {
// //       entryPoints: {
// //         ".": {
// //           override: {
// //             main: "./index.js",
// //             typings: "./index.d.ts",
// //           },
// //           ignoreMissingDependencies: true,
// //         }
// //       },
// //       ignorableDeepImportMatchers: [
// //         /tns-core-modules\//,
// //         /@nativescript\/core\//,
// //       ]
// //     }
// //   }
// // };
// module.exports = {
//     "packages": {
//         "@nativescript/angular": {
//             entryPoints: {
//                 ".": {
//                     override: {
//                         main: "./index.js",
//                         typings: "./index.d.ts",
//                     },
//                     ignoreMissingDependencies: true,
//                 }
//             },
//             ignorableDeepImportMatchers: [
//                 /zone.js\//,
//                 /tns-core-modules\//,
//                 /@nativescript\/core\//
//             ]
//         },
//         "nativescript-datetimepicker": {
//             entryPoints: {
//                 ".": {
//                     override: {
//                         main: "./index.js",
//                         typings: "./index.d.ts",
//                     },
//                     ignoreMissingDependencies: true,
//                 },
//                 "angular": {
//                     override: {
//                         main: "./index.js",
//                         typings: "./index.d.ts",
//                     },
//                     ignoreMissingDependencies: true,
//                 }
//             },
//             ignorableDeepImportMatchers: [
//                 /tns-core-modules\//,
//                 /@nativescript\/core\//,
//                 /@nativescript\/angular\//
//             ]
//         },
//         "nativescript-ui-sidedrawer": {
//             entryPoints: {
//                 "angular": {
//                     override: {
//                         main: "./side-drawer-directives.js",
//                         typings: "./side-drawer-directives.d.ts",
//                     },
//                     ignoreMissingDependencies: true,
//                 }
//             },
//             ignorableDeepImportMatchers: [
//                 /tns-core-modules\//,
//                 /@nativescript\/core\//,
//                 /@nativescript\/angular\//
//             ]
//         },
//         "nativescript-ui-listview": {
//             entryPoints: {
//                 "angular": {
//                     override: {
//                         main: "./listview-directives.js",
//                         typings: "./listview-directives.d.ts",
//                     },
//                     ignoreMissingDependencies: true,
//                 }
//             },
//             ignorableDeepImportMatchers: [
//                 /tns-core-modules\//,
//                 /@nativescript\/core\//,
//                 /@nativescript\/angular\//
//             ]
//         }
//     }
// }

module.exports = {
    "packages": {
        "@nativescript/angular": {
            entryPoints: {
                ".": {
                    override: {
                        main: "./index.js",
                        typings: "./index.d.ts",
                    },
                    ignoreMissingDependencies: true,
                }
            },
            ignorableDeepImportMatchers: [
                /tns-core-modules\//,
                /@nativescript\/core\//
            ]
        },
        "nativescript-datetimepicker": {
            entryPoints: {
                ".": {
                    override: {
                        main: "./index.js",
                        typings: "./index.d.ts",
                    },
                    ignoreMissingDependencies: true,
                },
                "angular": {
                    override: {
                        main: "./index.js",
                        typings: "./index.d.ts",
                    },
                    ignoreMissingDependencies: true,
                }
            },
            ignorableDeepImportMatchers: [
                /tns-core-modules\//,
                /@nativescript\/core\//,
                /@nativescript\/angular\//
            ]
        },
        "nativescript-ui-sidedrawer": {
            entryPoints: {
                "angular": {
                    override: {
                        main: "./side-drawer-directives.js",
                        typings: "./side-drawer-directives.d.ts",
                    },
                    ignoreMissingDependencies: true,
                }
            },
            ignorableDeepImportMatchers: [
                /tns-core-modules\//,
                /@nativescript\/core\//,
                /@nativescript\/angular\//
            ]
        },
        "nativescript-ui-listview": {
            entryPoints: {
                "angular": {
                    override: {
                        main: "./listview-directives.js",
                        typings: "./listview-directives.d.ts",
                    },
                    ignoreMissingDependencies: true,
                }
            },
            ignorableDeepImportMatchers: [
                /tns-core-modules\//,
                /@nativescript\/core\//,
                /@nativescript\/angular\//
            ]
        },
        "nativescript-ui-chart": {
            entryPoints: {
                "angular": {
                    override: {
                        main: "./chart-directives.js",
                        typings: "./chart-directives.d.ts",
                    },
                    ignoreMissingDependencies: true,
                }
            },
            ignorableDeepImportMatchers: [
                /tns-core-modules\//,
                /@nativescript\/core\//,
                /@nativescript\/angular\//
            ]
        },
    }
}