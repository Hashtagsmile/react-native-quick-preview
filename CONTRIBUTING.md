# Contributing to React Native QuickPreview

Thank you for your interest in contributing to React Native QuickPreview! This document provides guidelines and information for contributors.

## 🎯 How to Contribute

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title** describing the issue
- **Detailed description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details**:
  - React Native version
  - Platform (iOS/Android)
  - Device/emulator info
  - Expo version (if applicable)
- **Screenshots/videos** if applicable
- **Code example** demonstrating the issue

### 💡 Suggesting Features

We welcome feature requests! When suggesting features:

- **Explain the use case** and why it would be valuable
- **Consider the scope** - does it fit the library's purpose?
- **Provide examples** of how it would be used
- **Check existing issues** for similar requests

### 🔧 Pull Requests

#### Before You Start

1. **Fork** the repository
2. **Create** a feature branch from `main`
3. **Install** dependencies: `npm install`
4. **Build** the library: `npm run build`
5. **Test** with the example app: `npm run example`

#### Development Workflow

1. **Make your changes** in the library (`packages/react-native-quick-preview/src/`)
2. **Test thoroughly** with the example app
3. **Update documentation** if needed
4. **Add tests** for new features
5. **Ensure TypeScript** compiles without errors
6. **Check accessibility** compliance

#### Code Style Guidelines

- **TypeScript**: Use strict typing, avoid `any`
- **Naming**: Use descriptive variable and function names
- **Comments**: Add JSDoc comments for public APIs
- **Formatting**: Follow existing code style
- **Imports**: Use named imports, organize imports logically

#### Testing Checklist

- [ ] Works on iOS
- [ ] Works on Android
- [ ] Accessibility features work
- [ ] Performance is acceptable
- [ ] No console warnings/errors
- [ ] TypeScript compiles successfully

#### Commit Messages

Use conventional commit format:

```
type(scope): description

feat(QuickPreview): add swipe-to-close gesture
fix(types): correct QuickPreviewProps interface
docs(readme): update installation instructions
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

#### Creating a Changeset

After making changes, create a changeset:

```bash
npx changeset
```

Choose the appropriate version bump:
- **Patch** (0.0.x): Bug fixes, documentation updates
- **Minor** (0.x.0): New features, backward-compatible
- **Major** (x.0.0): Breaking changes

## 🏗️ Project Structure

```
packages/react-native-quick-preview/
├── src/
│   ├── QuickPreview.tsx              # Main component
│   ├── QuickPreviewProperties.ts     # TypeScript interfaces
│   └── index.ts                   # Public exports
├── dist/                          # Built files (generated)
├── package.json                   # Package configuration
├── tsconfig.json                  # TypeScript config
├── tsup.config.ts                 # Build configuration
└── README.md                      # Package documentation

apps/expo-quick-preview-example/
├── app/                           # Expo Router pages
├── components/                    # Example components
├── data/                          # Example data
└── package.json                   # Example app config
```

## 🧪 Testing

### Manual Testing

1. **Start the example app**: `npm run example`
2. **Test on both platforms** (iOS/Android)
3. **Test accessibility** features
4. **Test edge cases** (empty content, long text, etc.)
5. **Test performance** on lower-end devices

### Automated Testing

We're working on adding automated tests. For now, focus on:

- **TypeScript compilation**: `npm run type-check`
- **Build process**: `npm run build`
- **Manual testing** with the example app

## 📝 Documentation

### Updating Documentation

- **Library README**: Update `packages/react-native-quick-preview/README.md`
- **Example app**: Update example components and data
- **API changes**: Update TypeScript interfaces and JSDoc comments
- **Root README**: Update main README.md if needed

### Documentation Standards

- **Clear examples** with copy-paste code
- **TypeScript interfaces** for all props
- **Accessibility notes** for screen readers
- **Performance considerations** when relevant

## 🚀 Release Process

### For Maintainers

1. **Review changesets**: `npx changeset status`
2. **Version packages**: `npm run version-packages`
3. **Build library**: `npm run build`
4. **Publish to npm**: `npm run release`
5. **Push tags**: `git push --follow-tags`

### CI/CD

The project uses GitHub Actions for:
- **Automated testing** on pull requests
- **Automated releases** when changesets are merged
- **Type checking** and build verification

## 🤝 Community Guidelines

### Code of Conduct

- **Be respectful** and inclusive
- **Help others** learn and contribute
- **Provide constructive feedback**
- **Follow the project's coding standards**

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check the README files first

## 📋 Checklist for Contributors

Before submitting a pull request:

- [ ] Code follows TypeScript best practices
- [ ] All tests pass (manual and automated)
- [ ] Documentation is updated
- [ ] Changeset is created
- [ ] Code is accessible
- [ ] Performance is acceptable
- [ ] No console warnings/errors
- [ ] Works on both iOS and Android

## 🙏 Recognition

Contributors will be recognized in:
- **GitHub contributors** list
- **Release notes** for significant contributions
- **README acknowledgments** for major features

Thank you for contributing to React Native QuickPreview! 🎉
